// Fit score calculator (0-100) based on student profile and target company/opportunity
// Supports both Poland (PL) and the Netherlands (NL) without country bias.
// Evaluates:
// 1. Relevance to Web Multimedia Development (Max 25 pts)
// 2. Target Role, Digital Agency / Tech / Multimedia / Gaming Alignment (Max 25 pts)
// 3. Location & Financial Feasibility (Max 20 pts)
// 4. Internship Dates & ~4-5 Month Duration Compatibility (Max 15 pts)
// 5. English-Language Accessibility & International Student Suitability (Max 15 pts)

function calculateFitScore(profile, target) {
  const breakdown = [];
  let totalScore = 0;

  const techStr = (
    JSON.stringify(target.technologies || []) +
    ' ' +
    (target.description || '') +
    ' ' +
    (target.category || '') +
    ' ' +
    (target.industry || '') +
    ' ' +
    (target.title || '')
  ).toLowerCase();

  // 1. Relevance to Web Multimedia Development (Max 25 pts)
  let degreeScore = 0;
  if (
    techStr.includes('react') ||
    techStr.includes('frontend') ||
    techStr.includes('front-end') ||
    techStr.includes('web') ||
    techStr.includes('typescript') ||
    techStr.includes('javascript') ||
    techStr.includes('next.js')
  ) {
    degreeScore += 15;
  }
  if (
    techStr.includes('ui') ||
    techStr.includes('ux') ||
    techStr.includes('design') ||
    techStr.includes('figma') ||
    techStr.includes('multimedia') ||
    techStr.includes('interactive') ||
    techStr.includes('creative')
  ) {
    degreeScore += 7;
  }
  if (
    techStr.includes('node') ||
    techStr.includes('fullstack') ||
    techStr.includes('full-stack') ||
    techStr.includes('mobile') ||
    techStr.includes('c#') ||
    techStr.includes('unity') ||
    techStr.includes('unreal') ||
    techStr.includes('qa') ||
    techStr.includes('testing')
  ) {
    degreeScore += 4;
  }
  degreeScore = Math.min(25, Math.max(10, degreeScore));
  const degreeReason =
    degreeScore >= 20
      ? 'Strong overlap with IPCA Web Multimedia curriculum (Web Dev, Frontend/Backend, UI/UX, Interactive Media)'
      : 'Good overlap with software engineering and multimedia foundations';
  breakdown.push({
    factor: 'Degree Relevance (Web Multimedia)',
    score: degreeScore,
    max: 25,
    reason: degreeReason,
    text: degreeReason,
  });
  totalScore += degreeScore;

  // 2. Target Role & Industry Match (Max 25 pts)
  let areaScore = 0;
  const isGaming =
    target.is_gaming ||
    techStr.includes('game') ||
    techStr.includes('unreal') ||
    techStr.includes('unity');
  const isWebOrAgency =
    techStr.includes('web') ||
    techStr.includes('frontend') ||
    techStr.includes('front-end') ||
    techStr.includes('agency') ||
    techStr.includes('digital product') ||
    techStr.includes('ui/ux') ||
    techStr.includes('creative studio');
  const isSoftwareOrQa =
    techStr.includes('software') ||
    techStr.includes('fullstack') ||
    techStr.includes('developer') ||
    techStr.includes('engineering') ||
    techStr.includes('qa') ||
    techStr.includes('test');

  if (isWebOrAgency) {
    areaScore += 16;
  } else if (isSoftwareOrQa) {
    areaScore += 14;
  }
  if (isGaming) {
    areaScore += 9;
  } else if (isSoftwareOrQa && isWebOrAgency) {
    areaScore += 8;
  } else {
    areaScore += 6;
  }
  areaScore = Math.min(25, Math.max(12, areaScore));
  const areaReason = isWebOrAgency
    ? 'High alignment with primary Web, Frontend, UI/UX & Digital Product Agency focus'
    : isGaming
    ? 'Strong alignment with Game Development / Game QA & Interactive Tech category'
    : 'Solid match with Software Engineering & QA priorities';
  breakdown.push({
    factor: 'Target Role & Sector Match',
    score: areaScore,
    max: 25,
    reason: areaReason,
    text: areaReason,
  });
  totalScore += areaScore;

  // 3. Location & Financial Feasibility (Max 20 pts)
  // Evaluates both Polish and Dutch hubs fairly without ranking NL above PL automatically
  const city = (target.city || '').toLowerCase();
  const country = (target.country || 'Poland').toLowerCase();
  const salaryInfo = (target.salary_info || '').toLowerCase();
  const hasPaidStipend =
    salaryInfo.includes('paid') ||
    salaryInfo.includes('€') ||
    salaryInfo.includes('eur') ||
    salaryInfo.includes('pln') ||
    salaryInfo.includes('stagevergoeding') ||
    salaryInfo.includes('stipend');

  let locationScore = 14;
  let locReason = 'Supported European internship hub';

  if (country.includes('netherlands') || country === 'nl') {
    if (
      city.includes('eindhoven') ||
      city.includes('rotterdam') ||
      city.includes('utrecht') ||
      city.includes('delft') ||
      city.includes('the hague') ||
      city.includes('den haag') ||
      city.includes('groningen') ||
      city.includes('breda') ||
      city.includes('leiden') ||
      city.includes('arnhem')
    ) {
      locationScore = hasPaidStipend ? 19 : 17;
      locReason = `${target.city}, Netherlands — IPCA Group 1 (€650/mo) + balanced Dutch tech hub living costs${hasPaidStipend ? ' & stagevergoeding' : ''}`;
    } else if (city.includes('amsterdam') || city.includes('hilversum')) {
      locationScore = hasPaidStipend ? 19 : 16;
      locReason = `${target.city}, Netherlands — Premier Dutch digital/tech hub; IPCA Group 1 (€650/mo), higher rent offset by ${hasPaidStipend ? 'internship stipend' : 'international scale'}`;
    } else {
      locationScore = 16;
      locReason = 'Netherlands tech hub (IPCA Group 1 — €650/mo scholarship)';
    }
  } else {
    // Poland
    if (city.includes('kraków') || city.includes('krakow')) {
      locationScore = 20;
      locReason = 'Top Polish location (Kraków tech & gaming ecosystem) with strong financial feasibility';
    } else if (city.includes('warsaw') || city.includes('warszawa')) {
      locationScore = 19;
      locReason = 'Primary Polish hub (Warsaw capital tech scene) with good cost-to-scholarship ratio';
    } else if (city.includes('gdańsk') || city.includes('gdansk') || city.includes('tricity')) {
      locationScore = 18;
      locReason = 'Preferred coastal tech hub (Gdańsk / Tricity) with accessible student living costs';
    } else if (city.includes('wrocław') || city.includes('wroclaw') || city.includes('poznań') || city.includes('poznan')) {
      locationScore = 17;
      locReason = 'Major Polish software & digital engineering city with affordable student housing';
    }
  }

  breakdown.push({
    factor: 'Location & Financial Feasibility',
    score: locationScore,
    max: 20,
    reason: locReason,
    text: locReason,
  });
  totalScore += locationScore;

  // 4. Internship Dates & ~4–5 Month Duration Compatibility (Max 15 pts)
  let dateScore = 14;
  let dateReason = 'Compatible with Feb/Mar 2027 start and ~4–5 month European curricular placement';
  if (target.internship_start) {
    if (target.internship_start.includes('2027-02') || target.internship_start.includes('2027-03')) {
      dateScore = 15;
      dateReason = `Matches February/March 2027 start (${target.duration_months || 5} months placement window)`;
    } else {
      dateScore = 11;
      dateReason = 'Flexible dates; timing requires confirmation with company';
    }
  }
  breakdown.push({
    factor: 'Internship Dates & Duration',
    score: dateScore,
    max: 15,
    reason: dateReason,
    text: dateReason,
  });
  totalScore += dateScore;

  // 5. Language & International Student Suitability (Max 15 pts)
  let langScore = 13;
  let langReason = 'English accepted as working language for international interns';
  const langReq = (target.language_requirements || '').toLowerCase();
  if (
    langReq.includes('polish required') ||
    langReq.includes('wymagany polski') ||
    langReq.includes('dutch required') ||
    langReq.includes('nederlands vereist') ||
    langReq.includes('fluent dutch')
  ) {
    langScore = 6;
    langReason = 'Notice: Local language (Dutch or Polish) proficiency mentioned — verify English flexibility';
  } else if (
    langReq.includes('english') ||
    target.is_gaming ||
    (target.industry || '').toLowerCase().includes('international') ||
    (target.industry || '').toLowerCase().includes('global')
  ) {
    langScore = 15;
    langReason = 'Verified English-speaking workplace welcoming international / Erasmus+ university interns';
  }
  breakdown.push({
    factor: 'Language & International Suitability',
    score: langScore,
    max: 15,
    reason: langReason,
    text: langReason,
  });
  totalScore += langScore;

  const finalScore = Math.min(100, Math.max(20, totalScore));
  let priority = 'Medium';
  if (finalScore >= 88) priority = 'High';
  else if (finalScore < 65) priority = 'Low';

  return {
    fitScore: finalScore,
    priority,
    breakdown,
  };
}

module.exports = { calculateFitScore };
