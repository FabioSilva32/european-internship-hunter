// Fit score calculator (0-100) based on student profile and target company/opportunity
// Supports all 11 European destination countries (PL, HR, HU, EE, BG, RS, SI, SK, CZ, NO, DK) objectively.
// Evaluates:
// 1. Relevance to Web Multimedia Development (Max 25 pts)
// 2. Target Role, SME Software House / Digital Agency / Tech / Multimedia Alignment (Max 25 pts)
// 3. Location & Financial Feasibility with IPCA Group 1/2/3 Scholarship (Max 20 pts)
// 4. Internship Dates & ~4-5 Month Duration Compatibility + 30 Nov 2026 Deadline (Max 15 pts)
// 5. English-Language Accessibility & International Student Suitability (Max 15 pts)

const COUNTRY_SCHOLARSHIP_INFO = {
  poland: { name: 'Poland', code: 'PL', group: 'Group 3', rate: 550 },
  croatia: { name: 'Croatia', code: 'HR', group: 'Group 3', rate: 550 },
  hungary: { name: 'Hungary', code: 'HU', group: 'Group 3', rate: 550 },
  estonia: { name: 'Estonia', code: 'EE', group: 'Group 2', rate: 600 },
  bulgaria: { name: 'Bulgaria', code: 'BG', group: 'Group 3', rate: 550 },
  serbia: { name: 'Serbia', code: 'RS', group: 'Group 3', rate: 550 },
  slovenia: { name: 'Slovenia', code: 'SI', group: 'Group 2', rate: 600 },
  slovakia: { name: 'Slovakia', code: 'SK', group: 'Group 2', rate: 600 },
  czechia: { name: 'Czechia', code: 'CZ', group: 'Group 2', rate: 600 },
  norway: { name: 'Norway', code: 'NO', group: 'Group 1', rate: 650 },
  denmark: { name: 'Denmark', code: 'DK', group: 'Group 1', rate: 650 },
};

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
    techStr.includes('studio') ||
    techStr.includes('software house');
  const isSoftwareOrQa =
    techStr.includes('software') ||
    techStr.includes('fullstack') ||
    techStr.includes('developer') ||
    techStr.includes('engineering') ||
    techStr.includes('qa') ||
    techStr.includes('test');

  if (isWebOrAgency) {
    areaScore += 17;
  } else if (isSoftwareOrQa) {
    areaScore += 15;
  }
  if (isGaming) {
    areaScore += 8;
  } else if (isSoftwareOrQa && isWebOrAgency) {
    areaScore += 8;
  } else {
    areaScore += 6;
  }
  areaScore = Math.min(25, Math.max(12, areaScore));
  const areaReason = isWebOrAgency
    ? 'High alignment with primary Web, Frontend/Backend, UI/UX & SME Digital Agency/Software House focus'
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
  const city = (target.city || '').toLowerCase();
  const countryKey = (target.country || 'Poland').toLowerCase().trim();
  const salaryInfo = (target.salary_info || '').toLowerCase();
  const hasPaidStipend =
    salaryInfo.includes('paid') ||
    salaryInfo.includes('pln') ||
    salaryInfo.includes('stipend') ||
    salaryInfo.includes('traineeship');

  const meta = COUNTRY_SCHOLARSHIP_INFO[countryKey] || COUNTRY_SCHOLARSHIP_INFO.poland;
  let locationScore = 18;
  let locReason = `${target.city || meta.name}, ${meta.name} — IPCA ${meta.group} (€${meta.rate}/mo scholarship)`;

  if (meta.code === 'PL') {
    if (city.includes('kraków') || city.includes('krakow')) {
      locationScore = 20;
      locReason = 'Top Polish location (Kraków tech & gaming ecosystem; IPCA Group 3 €550/mo + €150/mo AGH/UJ dorms)';
    } else if (city.includes('warsaw') || city.includes('warszawa')) {
      locationScore = 19;
      locReason = 'Primary Polish hub (Warsaw capital tech scene; IPCA Group 3 €550/mo + €180/mo PW/UW dorms)';
    } else {
      locationScore = 18;
      locReason = `${target.city}, Poland — IPCA Group 3 (€550/mo) with affordable student dormitory housing`;
    }
  } else if (meta.group === 'Group 1') {
    // Norway & Denmark (€650/mo)
    locationScore = hasPaidStipend ? 19 : 17;
    locReason = `${target.city}, ${meta.name} — IPCA Group 1 (€650/mo highest grant rate) + student kollegiet/SiO housing`;
  } else if (meta.group === 'Group 2') {
    // Estonia, Slovenia, Slovakia, Czechia (€600/mo)
    locationScore = 19;
    locReason = `${target.city}, ${meta.name} — IPCA Group 2 (€600/mo grant) + affordable university dorms (~€135–€165/mo)`;
  } else {
    // Croatia, Hungary, Bulgaria, Serbia (€550/mo)
    locationScore = 19;
    locReason = `${target.city}, ${meta.name} — IPCA Group 3 (€550/mo grant) + very low student living & dorm costs (~€95–€135/mo)`;
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
  let dateReason = 'Compatible with Feb/Mar–Jun/Jul 2027 (4–5 mo) & 30 Nov 2026 placement deadline';
  if (target.internship_start) {
    if (target.internship_start.includes('2027-02') || target.internship_start.includes('2027-03')) {
      dateScore = 15;
      dateReason = `Matches Feb/Mar 2027 start (${target.duration_months || 5} mo placement; apply before 30 Nov 2026)`;
    } else {
      dateScore = 12;
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
  let langScore = 14;
  let langReason = 'English accepted as working language for international students';
  const langReq = (target.language_requirements || '').toLowerCase();
  if (langReq.includes('required') && !langReq.includes('english')) {
    langScore = 7;
    langReason = 'Notice: Local language proficiency mentioned — verify English flexibility';
  } else if (
    langReq.includes('english') ||
    target.is_gaming ||
    (target.industry || '').toLowerCase().includes('agency') ||
    (target.industry || '').toLowerCase().includes('studio')
  ) {
    langScore = 15;
    langReason = 'Verified English-speaking environment welcoming international / Erasmus+ university interns';
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
