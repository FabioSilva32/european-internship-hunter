const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const { SCHEMA_SQL } = require('../electron/database/schema.cjs');
const { seedEuropeanCountriesData } = require('../electron/database/europeanCountriesData.cjs');
const { IPCA_SCHOLARSHIP_CONFIG, calculateCityFinancialPlan } = require('../electron/services/financialService.cjs');

const DB_PATHS = [
  'C:\\Users\\itzfa\\AppData\\Roaming\\poland-internship-hunter\\database\\internship_hunter.sqlite',
  'C:\\Users\\itzfa\\AppData\\Roaming\\Electron\\database\\internship_hunter.sqlite',
  path.join(__dirname, '..', 'data', 'internship_hunter.sqlite'),
];

class SimpleWrapper {
  constructor(sqlDb, filePath) {
    this.sqlDb = sqlDb;
    this.filePath = filePath;
  }
  save() {
    const data = this.sqlDb.export();
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, Buffer.from(data));
  }
  exec(sql) {
    this.sqlDb.exec(sql);
  }
  prepare(sql) {
    const self = this;
    return {
      run(...params) {
        const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        self.sqlDb.run(sql, flat);
        return { changes: 1 };
      },
      get(...params) {
        const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        const stmt = self.sqlDb.prepare(sql);
        if (flat.length > 0) stmt.bind(flat);
        let res = undefined;
        if (stmt.step()) res = stmt.getAsObject();
        stmt.free();
        return res;
      },
      all(...params) {
        const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        const stmt = self.sqlDb.prepare(sql);
        if (flat.length > 0) stmt.bind(flat);
        const rows = [];
        while (stmt.step()) rows.push(stmt.getAsObject());
        stmt.free();
        return rows;
      },
    };
  }
}

async function runMigration() {
  const SQL = await initSqlJs();

  for (const dbPath of DB_PATHS) {
    if (!fs.existsSync(dbPath)) {
      console.log('[Skip] Not found:', dbPath);
      continue;
    }

    console.log('\n=======================================================');
    console.log('[Migrating DB]:', dbPath);
    const fileBuf = fs.readFileSync(dbPath);
    const sqlDb = new SQL.Database(fileBuf);
    const db = new SimpleWrapper(sqlDb, dbPath);

    db.exec(SCHEMA_SQL);

    // Ensure columns exist
    const compInfo = db.prepare('PRAGMA table_info(companies)').all();
    if (!compInfo.some((c) => c.name === 'country_code')) {
      db.exec("ALTER TABLE companies ADD COLUMN country_code TEXT DEFAULT 'PL';");
    }
    const oppInfo = db.prepare('PRAGMA table_info(opportunities)').all();
    if (!oppInfo.some((c) => c.name === 'country_code')) {
      db.exec("ALTER TABLE opportunities ADD COLUMN country_code TEXT DEFAULT 'PL';");
    }
    const appInfo = db.prepare('PRAGMA table_info(applications)').all();
    if (!appInfo.some((c) => c.name === 'country')) {
      db.exec("ALTER TABLE applications ADD COLUMN country TEXT DEFAULT 'Poland';");
    }

    // Count Polish companies and applications BEFORE migration
    const plBefore = db.prepare("SELECT count(*) as c FROM companies WHERE country = 'Poland'").get().c;
    const appsBefore = db.prepare('SELECT count(*) as c FROM applications').get().c;

    // Seed 10 new European countries & remove Netherlands
    seedEuropeanCountriesData(db);

    // Update settings
    const settingsToUpdate = [
      ['supported_countries', JSON.stringify(['Poland', 'Croatia', 'Hungary', 'Estonia', 'Bulgaria', 'Serbia', 'Slovenia', 'Slovakia', 'Czechia', 'Norway', 'Denmark']), '11 Supported European internship destination countries'],
      ['ipca_scholarship_group1_eur', '650', 'IPCA Group 1 (€650/mo: Norway, Denmark)'],
      ['ipca_scholarship_group2_eur', '600', 'IPCA Group 2 (€600/mo: Estonia, Slovenia, Slovakia, Czechia)'],
      ['ipca_scholarship_group3_eur', '550', 'IPCA Group 3 (€550/mo: Croatia, Hungary, Bulgaria, Serbia, Poland)'],
      ['ipca_scholarship_pl_eur', '550', 'IPCA Group 3 monthly scholarship rate for Poland (€550/month)'],
    ];
    for (const [k, v, d] of settingsToUpdate) {
      db.prepare('INSERT OR REPLACE INTO settings (key, value, description) VALUES (?, ?, ?)').run(k, v, d);
    }

    db.save();

    // Verify counts AFTER migration
    const plAfter = db.prepare("SELECT count(*) as c FROM companies WHERE country = 'Poland'").get().c;
    const nlAfter = db.prepare("SELECT count(*) as c FROM opportunities WHERE country = 'Netherlands' AND is_active = 1").get().c;
    const appsAfter = db.prepare('SELECT count(*) as c FROM applications').get().c;
    const byCountry = db.prepare('SELECT country, country_code, count(*) as count FROM companies GROUP BY country, country_code ORDER BY count DESC').all();
    const totalOpps = db.prepare("SELECT count(*) as c FROM opportunities WHERE is_active = 1").get().c;

    console.log(`[Verify] Polish companies preserved: ${plBefore} -> ${plAfter}`);
    console.log(`[Verify] Applications preserved: ${appsBefore} -> ${appsAfter}`);
    console.log(`[Verify] Active Netherlands opportunities remaining: ${nlAfter} (Expected: 0)`);
    console.log(`[Verify] Total active opportunities across 11 countries: ${totalOpps}`);
    console.log('[Verify] Companies by Country:', byCountry);
  }

  console.log('\n=======================================================');
  console.log('[Verify IPCA Scholarship Calculator Rates]:');
  for (const [country, cfg] of Object.entries(IPCA_SCHOLARSHIP_CONFIG.countries)) {
    console.log(` - ${country} (${cfg.countryCode}): ${cfg.group} -> €${cfg.monthlyRateEur}/month`);
  }
  const sampleZagreb = calculateCityFinancialPlan({ city: 'Zagreb', durationMonths: 5 });
  const samplePrague = calculateCityFinancialPlan({ city: 'Prague', durationMonths: 5 });
  const sampleCopenhagen = calculateCityFinancialPlan({ city: 'Copenhagen', durationMonths: 5 });
  const sampleKrakow = calculateCityFinancialPlan({ city: 'Kraków', durationMonths: 5 });
  console.log('[Sample 5-Month Calculations]:');
  console.log(` - Kraków (${sampleKrakow.country}): ${sampleKrakow.scholarshipGroup} €${sampleKrakow.scholarshipMonthlyEur}/mo | 5-mo Grant: €${sampleKrakow.totalsForDuration.totalScholarship}`);
  console.log(` - Zagreb (${sampleZagreb.country}): ${sampleZagreb.scholarshipGroup} €${sampleZagreb.scholarshipMonthlyEur}/mo | 5-mo Grant: €${sampleZagreb.totalsForDuration.totalScholarship}`);
  console.log(` - Prague (${samplePrague.country}): ${samplePrague.scholarshipGroup} €${samplePrague.scholarshipMonthlyEur}/mo | 5-mo Grant: €${samplePrague.totalsForDuration.totalScholarship}`);
  console.log(` - Copenhagen (${sampleCopenhagen.country}): ${sampleCopenhagen.scholarshipGroup} €${sampleCopenhagen.scholarshipMonthlyEur}/mo | 5-mo Grant: €${sampleCopenhagen.totalsForDuration.totalScholarship}`);
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

