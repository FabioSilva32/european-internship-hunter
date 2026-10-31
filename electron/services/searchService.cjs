const { calculateFitScore } = require('./fitScoreService.cjs');
const { seedNetherlandsData } = require('../database/netherlandsData.cjs');

// Helper for safe rate-limiting delay between external requests
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Verified Greenhouse engineering & creative boards (Poland & Netherlands)
const GREENHOUSE_BOARDS = [
  // Poland (PL)
  { token: 'allegro', company: 'Allegro', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['React', 'TypeScript', 'Java'] },
  { token: 'snowflake', company: 'Snowflake Poland', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['TypeScript', 'React', 'C++', 'Python'] },
  { token: 'docplanner', company: 'Docplanner', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['PHP', 'React', 'TypeScript'] },
  { token: 'huuugegames', company: 'Huuuge Games', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['Unity', 'C#', 'QA Testing', 'TypeScript'] },
  // Netherlands (NL)
  { token: 'adyen', company: 'Adyen', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['TypeScript', 'React', 'Java', 'Node.js', 'UI/UX'] },
  { token: 'miro', company: 'Miro', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['TypeScript', 'React', 'Canvas/WebGL', 'UI/UX Design'] },
  { token: 'guerrillagames', company: 'Guerrilla Games', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['C++', 'C#', 'Python', 'Game QA', 'Web Tools'] },
  { token: 'elastic', company: 'Elastic Amsterdam', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['TypeScript', 'React', 'Node.js', 'UI/UX'] },
];

// Verified Lever engineering & digital agency boards (Poland & Netherlands)
const LEVER_BOARDS = [
  // Poland (PL)
  { token: 'netguru', company: 'Netguru', city: 'Gdańsk', country: 'Poland', countryCode: 'PL', defaultTech: ['React', 'TypeScript', 'Figma', 'UI/UX'] },
  { token: 'spyrosoft', company: 'Spyrosoft', city: 'Kraków', country: 'Poland', countryCode: 'PL', defaultTech: ['C++', 'React', 'QA', 'Embedded'] },
  // Netherlands (NL)
  { token: 'backbase', company: 'Backbase', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['TypeScript', 'React', 'Angular', 'UI/UX Design', 'QA'] },
  { token: 'messagebird', company: 'Bird (MessageBird)', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['TypeScript', 'React', 'Node.js', 'Go'] },
];

// Verified Ashby engineering & web product boards (Poland & Netherlands)
const ASHBY_BOARDS = [
  // Poland (PL)
  { token: 'brainly', company: 'Brainly', city: 'Kraków', country: 'Poland', countryCode: 'PL', defaultTech: ['React', 'TypeScript', 'GraphQL', 'Python'] },
  // Netherlands (NL)
  { token: 'framer', company: 'Framer', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', defaultTech: ['React', 'TypeScript', 'Interactive Web', 'Figma', 'UI/UX'] },
];

function matchesCountryFilter(boardCountry, boardCode, filterCountry) {
  if (!filterCountry || filterCountry === 'All') return true;
  const f = filterCountry.toLowerCase();
  if (f === 'poland' || f === 'pl') return boardCountry === 'Poland' || boardCode === 'PL';
  if (f === 'netherlands' || f === 'the netherlands' || f === 'nl') return boardCountry === 'Netherlands' || boardCode === 'NL';
  return true;
}

function detectLanguageRequirement(title, locationText = '') {
  const combined = `${title} ${locationText}`.toLowerCase();
  if (combined.includes('dutch required') || combined.includes('nederlands vereist') || combined.includes('fluent dutch')) {
    return 'Dutch & English (Dutch required)';
  }
  if (combined.includes('polish required') || combined.includes('wymagany polski')) {
    return 'Polish & English (Polish required)';
  }
  return 'English (International / English-friendly)';
}

function detectCategory(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('ui') || t.includes('ux') || t.includes('design') || t.includes('product design')) {
    return 'UI/UX Design & Web Design';
  }
  if (t.includes('multimedia') || t.includes('interactive') || t.includes('creative')) {
    return 'Multimedia & Interactive Web';
  }
  if (t.includes('qa') || t.includes('test')) {
    return t.includes('game') ? 'Game QA & Game Testing' : 'Software Development & QA';
  }
  if (t.includes('game') || t.includes('unity') || t.includes('unreal')) {
    return 'Game Development';
  }
  if (t.includes('frontend') || t.includes('front-end') || t.includes('web') || t.includes('react')) {
    return 'Web & Frontend Development';
  }
  return 'Software Development & Programming';
}

async function runCompanyAndInternshipSearch({
  db,
  country = 'All',
  city = 'All',
  category = 'All',
  includeSpeculative = true,
  includeOfficial = true
}) {
  // Ensure verified Netherlands directory is seeded
  seedNetherlandsData(db);

  const profileRow = db.prepare('SELECT * FROM user_profile LIMIT 1').get();
  const searchRunId = 'run-' + Date.now();
  let totalDiscovered = 0;
  let newCompanies = 0;

  console.log(`[Search] Starting search run ${searchRunId} (Country: ${country}, City: ${city}, Category: ${category})...`);

  // Record search run start
  db.prepare(`
    INSERT INTO search_runs (id, provider_name, query_params, opportunities_found, new_companies_found, status)
    VALUES (?, 'multi_provider_hub', ?, 0, 0, 'running')
  `).run(searchRunId, JSON.stringify({ country, city, category, includeSpeculative, includeOfficial }));

  // Helper to process job entry
  const processJob = (job, board, sourceName, absUrl) => {
    const title = (job.title || '').toLowerCase();
    const locName = (job.location?.name || job.categories?.location || board.city || '').toLowerCase();

    // If board is multi-country (like Adyen/Miro/Elastic), ensure location matches Poland or Netherlands if specified
    if (board.country === 'Netherlands' && locName) {
      const isDutchLoc =
        locName.includes('amsterdam') ||
        locName.includes('rotterdam') ||
        locName.includes('utrecht') ||
        locName.includes('eindhoven') ||
        locName.includes('hague') ||
        locName.includes('den haag') ||
        locName.includes('groningen') ||
        locName.includes('delft') ||
        locName.includes('leiden') ||
        locName.includes('arnhem') ||
        locName.includes('breda') ||
        locName.includes('netherlands') ||
        locName.includes('nl');
      if (!isDutchLoc) return;
    }

    const isInternOrJunior =
      title.includes('intern') ||
      title.includes('internship') ||
      title.includes('trainee') ||
      title.includes('junior') ||
      title.includes('graduate') ||
      title.includes('staz') ||
      title.includes('staż') ||
      title.includes('praktyk') ||
      title.includes('stage') ||
      title.includes('stagiair') ||
      title.includes('stagiere') ||
      title.includes('afstudeerstage') ||
      title.includes('meewerkstage') ||
      title.includes('working student') ||
      title.includes('werkstudent');

    const isRelevantCategory =
      isInternOrJunior &&
      (title.includes('software') ||
        title.includes('engineer') ||
        title.includes('frontend') ||
        title.includes('front-end') ||
        title.includes('backend') ||
        title.includes('back-end') ||
        title.includes('fullstack') ||
        title.includes('full-stack') ||
        title.includes('web') ||
        title.includes('mobile') ||
        title.includes('ui') ||
        title.includes('ux') ||
        title.includes('design') ||
        title.includes('digital') ||
        title.includes('qa') ||
        title.includes('test') ||
        title.includes('developer') ||
        title.includes('multimedia') ||
        title.includes('interactive') ||
        title.includes('game'));

    if (isRelevantCategory || isInternOrJunior) {
      let comp = db.prepare('SELECT id FROM companies WHERE name = ?').get(board.company);
      if (!comp) {
        const compId = 'comp-' + board.countryCode.toLowerCase() + '-' + board.token;
        db.prepare(`
          INSERT INTO companies (id, name, city, country, website, careers_url, industry, fit_score, priority)
          VALUES (?, ?, ?, ?, ?, ?, 'Software & Digital Technology', 88, 'High')
        `).run(compId, board.company, board.city, board.country, `https://${board.token}.com`, absUrl);
        comp = { id: compId };
        newCompanies++;
      }

      const existingOpp = db
        .prepare('SELECT id FROM opportunities WHERE source_url = ? OR (company_id = ? AND title = ?)')
        .get(absUrl, comp.id, job.title);

      if (!existingOpp) {
        const oppId = 'opp-' + board.token + '-' + (job.id || Date.now());
        const detectedCat = detectCategory(job.title);
        const langReq = detectLanguageRequirement(job.title, locName);
        const durationMo = board.country === 'Netherlands' ? 5 : 4;
        const fit = calculateFitScore(profileRow || {}, {
          city: board.city,
          country: board.country,
          category: detectedCat,
          technologies: board.defaultTech,
          internship_start: '2027-02-01',
          duration_months: durationMo,
          language_requirements: langReq
        });

        db.prepare(`
          INSERT INTO opportunities (
            id, company_id, title, description, city, country, category,
            work_arrangement, is_official_vacancy, required_technologies,
            internship_start, internship_end, duration_months, language_requirements,
            source_name, source_url, fit_score, fit_breakdown, verified_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Hybrid', 1, ?, '2027-02-01', '2027-06-30', ?, ?, ?, ?, ?, ?, datetime('now'))
        `).run(
          oppId,
          comp.id,
          job.title,
          `Live verified vacancy from official ${board.company} (${board.city}, ${board.country}) careers board: ${job.title}`,
          board.city,
          board.country,
          detectedCat,
          JSON.stringify(board.defaultTech),
          durationMo,
          langReq,
          sourceName,
          absUrl,
          fit.fitScore,
          JSON.stringify(fit.breakdown)
        );
        totalDiscovered++;
      }
    }
  };

  // 1. Fetch live jobs from Greenhouse boards
  for (const board of GREENHOUSE_BOARDS) {
    if (!matchesCountryFilter(board.country, board.countryCode, country)) continue;
    if (city !== 'All' && !board.city.toLowerCase().includes(city.toLowerCase())) continue;

    try {
      await sleep(500);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const jobs = data.jobs || [];
        for (const job of jobs) {
          processJob(job, board, 'Greenhouse Job Board', job.absolute_url || `https://boards.greenhouse.io/${board.token}`);
        }
      }
    } catch (err) {
      console.warn(`[Search] Greenhouse query for ${board.token} skipped or timed out:`, err.message);
    }
  }

  // 2. Fetch live jobs from Lever boards
  for (const board of LEVER_BOARDS) {
    if (!matchesCountryFilter(board.country, board.countryCode, country)) continue;
    if (city !== 'All' && !board.city.toLowerCase().includes(city.toLowerCase())) continue;

    try {
      await sleep(500);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(`https://api.lever.co/v0/postings/${board.token}?mode=json`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const jobs = await res.json();
        if (Array.isArray(jobs)) {
          for (const job of jobs) {
            processJob(
              { title: job.text, id: job.id, categories: job.categories },
              board,
              'Lever Job Board',
              job.hostedUrl || `https://jobs.lever.co/${board.token}`
            );
          }
        }
      }
    } catch (err) {
      console.warn(`[Search] Lever query for ${board.token} skipped or timed out:`, err.message);
    }
  }

  // 3. Fetch live jobs from Ashby boards
  for (const board of ASHBY_BOARDS) {
    if (!matchesCountryFilter(board.country, board.countryCode, country)) continue;
    if (city !== 'All' && !board.city.toLowerCase().includes(city.toLowerCase())) continue;

    try {
      await sleep(500);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const res = await fetch(`https://api.ashbyhq.com/posting-api/job-board/${board.token}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const jobs = data.jobs || [];
        for (const job of jobs) {
          processJob(
            { title: job.title, id: job.id, location: { name: job.location } },
            board,
            'Ashby Job Board',
            job.jobUrl || `https://jobs.ashbyhq.com/${board.token}`
          );
        }
      }
    } catch (err) {
      console.warn(`[Search] Ashby query for ${board.token} skipped or timed out:`, err.message);
    }
  }

  // 4. Refresh fit scores of all companies and opportunities based on active user profile
  const allOpps = db.prepare(`
    SELECT o.*, c.name as company_name, c.is_gaming, c.industry
    FROM opportunities o 
    JOIN companies c ON o.company_id = c.id
  `).all();

  for (const op of allOpps) {
    const fit = calculateFitScore(profileRow || {}, {
      title: op.title,
      description: op.description,
      city: op.city,
      country: op.country || 'Poland',
      category: op.category,
      industry: op.industry,
      is_gaming: op.is_gaming,
      salary_info: op.salary_info,
      technologies: op.required_technologies ? JSON.parse(op.required_technologies) : [],
      internship_start: op.internship_start,
      duration_months: op.duration_months,
      language_requirements: op.language_requirements
    });

    db.prepare('UPDATE opportunities SET fit_score = ?, fit_breakdown = ? WHERE id = ?').run(
      fit.fitScore, JSON.stringify(fit.breakdown), op.id
    );
  }

  // Update search run status
  db.prepare(`
    UPDATE search_runs 
    SET opportunities_found = ?, new_companies_found = ?, status = 'completed'
    WHERE id = ?
  `).run(totalDiscovered, newCompanies, searchRunId);

  // Audit log
  db.prepare(`
    INSERT INTO audit_logs (id, action_type, entity_type, entity_id, details)
    VALUES (?, 'search', 'search_run', ?, ?)
  `).run('audit-' + Date.now(), searchRunId, JSON.stringify({ country, city, category, newDiscovered: totalDiscovered }));

  console.log(`[Search] Completed run ${searchRunId}: ${totalDiscovered} new opps, ${newCompanies} new companies.`);

  return {
    success: true,
    runId: searchRunId,
    newOpportunities: totalDiscovered,
    newCompanies
  };
}

module.exports = {
  runCompanyAndInternshipSearch
};
