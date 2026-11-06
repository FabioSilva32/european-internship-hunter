const { calculateFitScore } = require('./fitScoreService.cjs');
const { seedEuropeanCountriesData } = require('../database/europeanCountriesData.cjs');

// Helper for safe rate-limiting delay between external requests
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Verified Greenhouse engineering & digital product boards across supported European countries
const GREENHOUSE_BOARDS = [
  // Poland (PL)
  { token: 'allegro', company: 'Allegro', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['React', 'TypeScript', 'Java'] },
  { token: 'docplanner', company: 'Docplanner', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['TypeScript', 'React', 'Node.js'] },
  { token: 'huuugegames', company: 'Huuuge Games', city: 'Warsaw', country: 'Poland', countryCode: 'PL', defaultTech: ['Unity', 'C#', 'QA Testing', 'TypeScript'] },
  // Czechia (CZ)
  { token: 'strv', company: 'STRV', city: 'Prague', country: 'Czechia', countryCode: 'CZ', defaultTech: ['React', 'TypeScript', 'Next.js', 'Figma', 'UI/UX'] },
  // Estonia (EE)
  { token: 'veriff', company: 'Veriff', city: 'Tallinn', country: 'Estonia', countryCode: 'EE', defaultTech: ['TypeScript', 'React', 'Node.js', 'UI/UX', 'QA'] },
  // Denmark (DK)
  { token: 'pleo', company: 'Pleo', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', defaultTech: ['TypeScript', 'React', 'Kotlin', 'UI/UX Design'] },
];

// Verified Lever engineering & digital agency boards across supported European countries
const LEVER_BOARDS = [
  // Poland (PL)
  { token: 'netguru', company: 'Netguru', city: 'Gdańsk', country: 'Poland', countryCode: 'PL', defaultTech: ['React', 'TypeScript', 'Figma', 'UI/UX'] },
  { token: 'spyrosoft', company: 'Spyrosoft', city: 'Kraków', country: 'Poland', countryCode: 'PL', defaultTech: ['TypeScript', 'React', 'QA', 'Node.js'] },
  // Slovakia (SK)
  { token: 'vacuumlabs', company: 'Vacuumlabs', city: 'Bratislava', country: 'Slovakia', countryCode: 'SK', defaultTech: ['TypeScript', 'React', 'Node.js', 'UI/UX'] },
];

// Verified Ashby engineering & web product boards across supported European countries
const ASHBY_BOARDS = [
  // Poland (PL)
  { token: 'brainly', company: 'Brainly', city: 'Kraków', country: 'Poland', countryCode: 'PL', defaultTech: ['React', 'TypeScript', 'GraphQL', 'Python'] },
  // Norway (NO)
  { token: 'sanity', company: 'Sanity (Oslo Engineering Hub)', city: 'Oslo', country: 'Norway', countryCode: 'NO', defaultTech: ['TypeScript', 'React', 'Next.js', 'Design Systems'] },
];

function matchesCountryFilter(boardCountry, boardCode, filterCountry) {
  if (!filterCountry || filterCountry === 'All') return true;
  const f = filterCountry.toLowerCase().trim();
  return (
    (boardCountry || '').toLowerCase() === f ||
    (boardCode || '').toLowerCase() === f
  );
}

function detectLanguageRequirement(title, locationText = '') {
  const combined = `${title} ${locationText}`.toLowerCase();
  if (combined.includes('polish required') || combined.includes('wymagany polski')) {
    return 'Polish & English (Polish required)';
  }
  return 'English (Fluent / International-friendly)';
}

function detectCategory(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('ui') || t.includes('ux') || t.includes('design') || t.includes('product design')) {
    return 'UI/UX & Digital Product Design';
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
  // Ensure verified 10 European countries directory is seeded & NL is removed
  seedEuropeanCountriesData(db);

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

    const isInternOrJunior =
      title.includes('intern') ||
      title.includes('internship') ||
      title.includes('trainee') ||
      title.includes('junior') ||
      title.includes('graduate') ||
      title.includes('staz') ||
      title.includes('staż') ||
      title.includes('praktyk') ||
      title.includes('student') ||
      title.includes('academy');

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
          INSERT INTO companies (id, name, city, country, country_code, website, careers_url, industry, fit_score, priority)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'Software & Digital Technology', 92, 'High')
        `).run(compId, board.company, board.city, board.country, board.countryCode, `https://${board.token}.com`, absUrl);
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
        const durationMo = 5;
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
            id, company_id, title, description, city, country, country_code, category,
            work_arrangement, is_official_vacancy, required_technologies,
            internship_start, internship_end, duration_months, application_deadline,
            language_requirements, source_name, source_url, fit_score, fit_breakdown, verified_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Hybrid', 1, ?, '2027-02-01', '2027-06-30', ?, '2026-11-30', ?, ?, ?, ?, ?, datetime('now'))
        `).run(
          oppId,
          comp.id,
          job.title,
          `Live verified vacancy from official ${board.company} (${board.city}, ${board.country}) careers board: ${job.title}`,
          board.city,
          board.country,
          board.countryCode,
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
      await sleep(350);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
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
      await sleep(350);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
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
      await sleep(350);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
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

  // 4. Refresh fit scores of all active opportunities based on active user profile
  const allOpps = db.prepare(`
    SELECT o.*, c.name as company_name, c.is_gaming, c.industry
    FROM opportunities o 
    JOIN companies c ON o.company_id = c.id
    WHERE o.is_active = 1
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
