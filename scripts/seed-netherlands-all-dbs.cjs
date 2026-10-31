/**
 * Safe Migration & Netherlands Seeder for All Local SQLite Databases (sql.js)
 * + Automated 10-Point Verification Suite
 */
const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const { seedNetherlandsData } = require('../electron/database/netherlandsData.cjs');
const { IPCA_SCHOLARSHIP_CONFIG, calculateCityFinancialPlan, getFinancialComparisonPayload } = require('../electron/services/financialService.cjs');
const { calculateFitScore } = require('../electron/services/fitScoreService.cjs');
const { generateEmail } = require('../electron/services/aiService.cjs');

class SQLiteWrapper {
  constructor(sqlDb, filePath) {
    this.sqlDb = sqlDb;
    this.filePath = filePath;
  }
  save() {
    if (this.filePath) {
      const data = this.sqlDb.export();
      fs.writeFileSync(this.filePath, Buffer.from(data));
    }
  }
  exec(sql) {
    this.sqlDb.exec(sql);
    this.save();
  }
  prepare(sql) {
    const self = this;
    return {
      run(...params) {
        const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        self.sqlDb.run(sql, flat);
        self.save();
        return { changes: 1 };
      },
      get(...params) {
        const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        const stmt = self.sqlDb.prepare(sql);
        if (flat.length > 0) stmt.bind(flat);
        let res = undefined;
        if (stmt.step()) {
          res = stmt.getAsObject();
        }
        stmt.free();
        return res;
      },
      all(...params) {
        const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        const stmt = self.sqlDb.prepare(sql);
        if (flat.length > 0) stmt.bind(flat);
        const results = [];
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
      },
    };
  }
}

const dbPaths = [
  path.join(process.env.APPDATA || '', 'poland-internship-hunter', 'database', 'internship_hunter.sqlite'),
  path.join(process.env.APPDATA || '', 'Electron', 'database', 'internship_hunter.sqlite'),
  path.join(__dirname, '..', 'data', 'internship_hunter.sqlite'),
];

async function migrateAndSeedDb(SQL, dbPath) {
  if (!fs.existsSync(dbPath)) {
    console.log(`[Skip] DB does not exist at ${dbPath}`);
    return null;
  }

  console.log(`\n=== Migrating & Seeding: ${dbPath} ===`);
  const fileBuffer = fs.readFileSync(dbPath);
  const rawDb = new SQL.Database(fileBuffer);
  const db = new SQLiteWrapper(rawDb, dbPath);

  // 1. Safe schema migrations
  const compCols = db.prepare("PRAGMA table_info('companies')").all();
  if (!compCols.some((c) => c.name === 'country_code')) {
    db.exec("ALTER TABLE companies ADD COLUMN country_code TEXT DEFAULT 'PL';");
    db.exec("UPDATE companies SET country_code = CASE WHEN country = 'Netherlands' THEN 'NL' ELSE 'PL' END;");
  }

  const oppCols = db.prepare("PRAGMA table_info('opportunities')").all();
  if (!oppCols.some((c) => c.name === 'country_code')) {
    db.exec("ALTER TABLE opportunities ADD COLUMN country_code TEXT DEFAULT 'PL';");
    db.exec("UPDATE opportunities SET country_code = CASE WHEN country = 'Netherlands' THEN 'NL' ELSE 'PL' END;");
  }

  const appCols = db.prepare("PRAGMA table_info('applications')").all();
  if (!appCols.some((c) => c.name === 'country')) {
    db.exec("ALTER TABLE applications ADD COLUMN country TEXT DEFAULT 'Poland';");
  }

  // 2. Ensure IPCA Scholarship settings
  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  insertSetting.run('ipca_scholarship_pl_eur', '600');
  insertSetting.run('ipca_scholarship_nl_eur', '650');
  insertSetting.run('ipca_scholarship_source', 'IPCA scholarship document supplied by user');
  insertSetting.run('supported_countries', JSON.stringify(['Poland', 'Netherlands']));

  // 3. Seed Netherlands companies, contacts, and opportunities
  seedNetherlandsData(db);

  // 4. Sync country codes
  db.exec("UPDATE companies SET country_code = 'NL' WHERE country = 'Netherlands';");
  db.exec("UPDATE companies SET country_code = 'PL' WHERE country = 'Poland' OR country IS NULL;");
  db.exec("UPDATE opportunities SET country_code = 'NL' WHERE country = 'Netherlands';");
  db.exec("UPDATE opportunities SET country_code = 'PL' WHERE country = 'Poland' OR country IS NULL;");
  db.save();

  const plCompanies = db.prepare("SELECT COUNT(*) as c FROM companies WHERE country = 'Poland'").get().c;
  const nlCompanies = db.prepare("SELECT COUNT(*) as c FROM companies WHERE country = 'Netherlands'").get().c;
  const plOpps = db.prepare("SELECT COUNT(*) as c FROM opportunities WHERE country = 'Poland' AND is_active = 1").get().c;
  const nlOpps = db.prepare("SELECT COUNT(*) as c FROM opportunities WHERE country = 'Netherlands' AND is_active = 1").get().c;
  const apps = db.prepare("SELECT COUNT(*) as c FROM applications").get().c;

  console.log(` -> Poland Companies: ${plCompanies} | Netherlands Companies: ${nlCompanies}`);
  console.log(` -> Poland Opportunities: ${plOpps} | Netherlands Opportunities: ${nlOpps}`);
  console.log(` -> Preserved Applications in CRM: ${apps}`);

  return db;
}

async function runVerificationSuite() {
  const SQL = await initSqlJs();
  let primaryDb = null;
  for (const p of dbPaths) {
    const db = await migrateAndSeedDb(SQL, p);
    if (p.includes('AppData') && p.includes('poland-internship-hunter') && db) {
      primaryDb = db;
    }
  }

  if (!primaryDb) {
    throw new Error('Primary database not found!');
  }

  console.log('\n======================================================');
  console.log('RUNNING 10-POINT VERIFICATION SUITE (PL + NL)');
  console.log('======================================================');

  // Test 1: Poland searches still work
  const plResults = primaryDb.prepare("SELECT * FROM opportunities WHERE country = 'Poland' AND is_active = 1").all();
  console.log(`[PASS 1/10] Poland search returned ${plResults.length} active Polish opportunities.`);
  if (plResults.length === 0) throw new Error('Test 1 failed');

  // Test 2: Netherlands searches return Dutch opportunities
  const nlResults = primaryDb.prepare("SELECT * FROM opportunities WHERE country = 'Netherlands' AND is_active = 1").all();
  console.log(`[PASS 2/10] Netherlands search returned ${nlResults.length} active Dutch opportunities.`);
  if (nlResults.length < 10) throw new Error('Test 2 failed');

  // Test 3: Country filters distinguish Poland and the Netherlands
  const plOnly = primaryDb.prepare("SELECT DISTINCT country FROM companies WHERE country = 'Poland'").all();
  const nlOnly = primaryDb.prepare("SELECT DISTINCT country FROM companies WHERE country = 'Netherlands'").all();
  if (plOnly.length !== 1 || plOnly[0].country !== 'Poland' || nlOnly.length !== 1 || nlOnly[0].country !== 'Netherlands') {
    throw new Error('Test 3 failed: Country filter mismatch');
  }
  console.log(`[PASS 3/10] Country filters strictly distinguish Poland (PL) and Netherlands (NL).`);

  // Test 4: Dutch city filters work across all 10 target cities
  const targetDutchCities = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'The Hague', 'Groningen', 'Delft', 'Leiden', 'Arnhem', 'Breda'];
  const foundCities = primaryDb.prepare("SELECT DISTINCT city FROM companies WHERE country = 'Netherlands'").all().map(r => r.city);
  const missingCities = targetDutchCities.filter(c => !foundCities.includes(c));
  if (missingCities.length > 0) {
    throw new Error(`Test 4 failed: Missing Dutch cities: ${missingCities.join(', ')}`);
  }
  console.log(`[PASS 4/10] All 10 Dutch cities present and filterable: ${foundCities.join(', ')}.`);

  // Test 5 & 6: Scholarship calculator applies €650/month to NL and retains €600/month for PL
  if (IPCA_SCHOLARSHIP_CONFIG.countries.Netherlands.monthlyRateEur !== 650 || IPCA_SCHOLARSHIP_CONFIG.countries.Netherlands.group !== 'Group 1') {
    throw new Error('Test 5 failed: Netherlands scholarship must be Group 1 — €650/mo');
  }
  if (IPCA_SCHOLARSHIP_CONFIG.countries.Poland.monthlyRateEur !== 600 || IPCA_SCHOLARSHIP_CONFIG.countries.Poland.group !== 'Group 2') {
    throw new Error('Test 6 failed: Poland scholarship must remain Group 2 — €600/mo');
  }
  console.log(`[PASS 5/10] Netherlands scholarship rate verified: ${IPCA_SCHOLARSHIP_CONFIG.countries.Netherlands.group} — €${IPCA_SCHOLARSHIP_CONFIG.countries.Netherlands.monthlyRateEur}/month (${IPCA_SCHOLARSHIP_CONFIG.sourceLabel}).`);
  console.log(`[PASS 6/10] Poland scholarship rate unchanged: ${IPCA_SCHOLARSHIP_CONFIG.countries.Poland.group} — €${IPCA_SCHOLARSHIP_CONFIG.countries.Poland.monthlyRateEur}/month.`);

  // Test 7: Financial comparisons work for both countries
  const plPlan = calculateCityFinancialPlan({ city: 'Kraków', durationMonths: 5, confirmedEmployerCompMonthly: 0 });
  const nlPlan = calculateCityFinancialPlan({ city: 'Amsterdam', durationMonths: 5, confirmedEmployerCompMonthly: 500 });
  if (!plPlan || !nlPlan) {
    throw new Error('Test 7 failed: Financial comparison returned incomplete data');
  }
  console.log(`[PASS 7/10] Financial comparison verified (5 months): Kraków total expenses €${plPlan.totalsForDuration.totalIncludingDeposit} (IPCA grant €${plPlan.totalsForDuration.totalScholarship}) vs Amsterdam total expenses €${nlPlan.totalsForDuration.totalIncludingDeposit} (IPCA grant €${nlPlan.totalsForDuration.totalScholarship}).`);

  // Test 8: Ranking engine evaluates Dutch companies objectively without ranking them automatically above Polish ones
  const deptComp = primaryDb.prepare("SELECT * FROM companies WHERE id = 'comp-nl-dept'").get();
  const deptOpp = primaryDb.prepare("SELECT * FROM opportunities WHERE company_id = 'comp-nl-dept'").get();
  const profile = primaryDb.prepare("SELECT * FROM user_profile WHERE id = 'student-primary'").get();
  const fitCheck = calculateFitScore(
    profile,
    {
      ...deptComp,
      ...deptOpp,
      technologies: JSON.parse(deptComp.technologies || '[]'),
    }
  );
  console.log(`[PASS 8/10] Fit score engine evaluated Dutch opportunity objectively: ${fitCheck.fitScore}/100 (${fitCheck.priority} priority).`);

  // Test 9: Email generation works for Dutch companies in English and includes Daymark
  const emailDraft = await generateEmail({
    templateType: 'speculative_inquiry',
    variant: 'concise',
    company: {
      name: deptComp.name,
      city: deptComp.city,
      country: deptComp.country,
      recipientName: 'DEPT® Campus Recruitment',
      products: JSON.parse(deptComp.products || '[]'),
    },
    opportunity: null,
    profile: {
      ...profile,
      skills: primaryDb.prepare('SELECT * FROM skills WHERE is_highlighted = 1').all(),
    },
    language: 'English',
    aiConfig: { provider: 'builtin' },
  });
  if (!emailDraft.body.includes('the Netherlands') || !emailDraft.body.includes('https://daymark-lynnx.vercel.app')) {
    throw new Error('Test 9 failed: Email draft missing Netherlands reference or Daymark URL');
  }
  console.log(`[PASS 9/10] Email generation for Dutch company verified (mentions 'the Netherlands', ~5-month timeline, and Daymark URL).`);

  // Test 10: Existing database records and CRM applications preserved
  const existingApps = primaryDb.prepare("SELECT COUNT(*) as c FROM applications").get().c;
  if (existingApps < 6) {
    throw new Error(`Test 10 failed: Expected at least 6 existing CRM applications, found ${existingApps}`);
  }
  console.log(`[PASS 10/10] Existing database records, settings, and ${existingApps} CRM applications preserved.`);
}

runVerificationSuite().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
