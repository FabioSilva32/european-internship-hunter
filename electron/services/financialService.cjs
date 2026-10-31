// Single Source of Truth for IPCA Erasmus+ / Mobility Scholarship & Country/City Financial Comparisons
// Preserves Poland's existing configuration and adds the Netherlands (Group 1 — €650/month)

const IPCA_SCHOLARSHIP_CONFIG = {
  sourceLabel: 'IPCA scholarship document supplied by user',
  academicYear: '2026/2027',
  defaultDurationMonths: 5,
  confirmationNotice:
    'Applicable academic year (2026/2027), exact funded duration (4–5 months), and eligibility rules require formal confirmation with IPCA (GRI / International Mobility Office). Scholarship alone does not cover all living expenses.',
  countries: {
    Poland: {
      country: 'Poland',
      countryCode: 'PL',
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'PLN',
      eurExchangeNote: '1 EUR ≈ 4.30 PLN (Oct 2026 reference)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Netherlands: {
      country: 'Netherlands',
      countryCode: 'NL',
      group: 'Group 1',
      monthlyRateEur: 650,
      currencyLocal: 'EUR',
      eurExchangeNote: 'Eurozone (EUR)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
  },
};

// City-specific monthly & one-off cost estimates (EUR) with transparent sources and date checked
const CITY_LIVING_COSTS = {
  // --- POLAND (PL) ---
  'Kraków': {
    city: 'Kraków',
    country: 'Poland',
    countryCode: 'PL',
    rent: 460,
    utilitiesInternet: 75,
    foodGroceries: 230,
    publicTransport: 22,
    otherLiving: 90,
    travelFromPortugal: 170,
    initialDeposit: 460,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€1,100 – €1,500/mo (4,800–6,500 PLN if paid vacancy)',
    housingNote: 'Private student room or shared flat in Zabłocie / Kazimierz / Krowodrza',
    sources: 'Otodom / OLX Kraków Student Housing Index, MPK Kraków Student Pass, Numbeo (Checked Oct 2026)',
    isEstimate: true,
  },
  'Warsaw': {
    city: 'Warsaw',
    country: 'Poland',
    countryCode: 'PL',
    rent: 540,
    utilitiesInternet: 85,
    foodGroceries: 250,
    publicTransport: 26,
    otherLiving: 100,
    travelFromPortugal: 165,
    initialDeposit: 540,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€1,200 – €1,750/mo (5,200–7,500 PLN if paid vacancy)',
    housingNote: 'Single room in shared apartment in Mokotów / Wola / Śródmieście',
    sources: 'Otodom Warsaw Rental Report, ZTM Warszawa Student Pass, Numbeo (Checked Oct 2026)',
    isEstimate: true,
  },
  'Gdańsk': {
    city: 'Gdańsk',
    country: 'Poland',
    countryCode: 'PL',
    rent: 440,
    utilitiesInternet: 75,
    foodGroceries: 225,
    publicTransport: 24,
    otherLiving: 85,
    travelFromPortugal: 185,
    initialDeposit: 440,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€1,050 – €1,450/mo (4,500–6,200 PLN if paid vacancy)',
    housingNote: 'Student room in Wrzeszcz / Oliwa near Tricity SKM line',
    sources: 'Trojmiasto.pl Rental Listings, ZTM Gdańsk, Numbeo (Checked Oct 2026)',
    isEstimate: true,
  },
  'Wrocław': {
    city: 'Wrocław',
    country: 'Poland',
    countryCode: 'PL',
    rent: 450,
    utilitiesInternet: 75,
    foodGroceries: 225,
    publicTransport: 22,
    otherLiving: 85,
    travelFromPortugal: 175,
    initialDeposit: 450,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€1,050 – €1,450/mo (4,500–6,200 PLN if paid vacancy)',
    housingNote: 'Student room in Krzyki / Nadodrze / Grunwaldzki',
    sources: 'Otodom Wrocław, MPK Wrocław, Numbeo (Checked Oct 2026)',
    isEstimate: true,
  },
  'Poznań': {
    city: 'Poznań',
    country: 'Poland',
    countryCode: 'PL',
    rent: 420,
    utilitiesInternet: 70,
    foodGroceries: 220,
    publicTransport: 21,
    otherLiving: 80,
    travelFromPortugal: 180,
    initialDeposit: 420,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€1,000 – €1,400/mo (4,300–6,000 PLN if paid vacancy)',
    housingNote: 'Student room in Jeżyce / Łazarz / Centrum',
    sources: 'Otodom Poznań, ZTM Poznań, Numbeo (Checked Oct 2026)',
    isEstimate: true,
  },

  // --- NETHERLANDS (NL) ---
  'Amsterdam': {
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 980,
    utilitiesInternet: 115,
    foodGroceries: 310,
    publicTransport: 95,
    otherLiving: 130,
    travelFromPortugal: 160,
    initialDeposit: 980,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€500 – €850/mo (Standard Dutch stagevergoeding)',
    housingNote: 'Student room via Kamernet / HousingAnywhere / DUWO (high demand — book 3+ months ahead)',
    sources: 'HousingAnywhere International Rent Index Q3 2026, Kamernet, GVB / NS OV-chipkaart, Nibud Student Budget (Checked Oct 2026)',
    isEstimate: true,
  },
  'Rotterdam': {
    city: 'Rotterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 790,
    utilitiesInternet: 105,
    foodGroceries: 290,
    publicTransport: 85,
    otherLiving: 115,
    travelFromPortugal: 165,
    initialDeposit: 790,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€450 – €750/mo (Dutch stagevergoeding)',
    housingNote: 'Shared apartment room in Kralingen / Delfshaven / Noord (bike + RET metro)',
    sources: 'HousingAnywhere & Kamernet Rotterdam 2026, RET Transit, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Utrecht': {
    city: 'Utrecht',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 830,
    utilitiesInternet: 110,
    foodGroceries: 295,
    publicTransport: 80,
    otherLiving: 120,
    travelFromPortugal: 165,
    initialDeposit: 830,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€450 – €750/mo (Dutch stagevergoeding)',
    housingNote: 'Student room via SSH / Kamernet; cycling is primary daily commute (Swapfiets ~€20/mo)',
    sources: 'Kamernet Utrecht Rent Report 2026, U-OV / Swapfiets, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Eindhoven': {
    city: 'Eindhoven',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 690,
    utilitiesInternet: 100,
    foodGroceries: 275,
    publicTransport: 65,
    otherLiving: 105,
    travelFromPortugal: 145,
    initialDeposit: 690,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€450 – €750/mo (Brainport Tech & Agency stagevergoeding)',
    housingNote: 'Brainport tech hub; direct Ryanair/Transavia flights from Porto/Lisbon to Eindhoven Airport',
    sources: 'Kamernet Eindhoven 2026, Vestide, Hermes OV, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'The Hague': {
    city: 'The Hague',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 770,
    utilitiesInternet: 105,
    foodGroceries: 285,
    publicTransport: 80,
    otherLiving: 115,
    travelFromPortugal: 165,
    initialDeposit: 770,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€450 – €700/mo (Dutch stagevergoeding)',
    housingNote: 'Student room in Zeeheldenkwartier / Laak / Bezuidenhout (HTM tram & bike)',
    sources: 'Kamernet Den Haag 2026, HTM / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Groningen': {
    city: 'Groningen',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 610,
    utilitiesInternet: 95,
    foodGroceries: 260,
    publicTransport: 55,
    otherLiving: 95,
    travelFromPortugal: 190,
    initialDeposit: 610,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: 'Compact university cycling city with lower student room costs than Randstad',
    sources: 'SSH / Kamernet Groningen 2026, Qbuzz / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Delft': {
    city: 'Delft',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 710,
    utilitiesInternet: 100,
    foodGroceries: 275,
    publicTransport: 65,
    otherLiving: 105,
    travelFromPortugal: 165,
    initialDeposit: 710,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€450 – €700/mo (Dutch stagevergoeding)',
    housingNote: 'TU Delft engineering corridor between The Hague and Rotterdam (12 min by train)',
    sources: 'DUWO / Kamernet Delft 2026, NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Leiden': {
    city: 'Leiden',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 730,
    utilitiesInternet: 100,
    foodGroceries: 280,
    publicTransport: 65,
    otherLiving: 105,
    travelFromPortugal: 160,
    initialDeposit: 730,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: '15 minutes by direct train from Schiphol Airport and The Hague',
    sources: 'DUWO / Kamernet Leiden 2026, NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Arnhem': {
    city: 'Arnhem',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 600,
    utilitiesInternet: 95,
    foodGroceries: 260,
    publicTransport: 60,
    otherLiving: 95,
    travelFromPortugal: 180,
    initialDeposit: 600,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€400 – €600/mo (Dutch stagevergoeding)',
    housingNote: 'More affordable eastern Dutch creative & digital hub',
    sources: 'Kamernet Arnhem 2026, Breng OV, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Breda': {
    city: 'Breda',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 620,
    utilitiesInternet: 95,
    foodGroceries: 265,
    publicTransport: 60,
    otherLiving: 95,
    travelFromPortugal: 160,
    initialDeposit: 620,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: 'Strong game dev & SaaS hub in North Brabant (close to Eindhoven & Rotterdam)',
    sources: 'Klik voor Kamers / Kamernet Breda 2026, Arriva / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
};

function calculateCityFinancialPlan({
  city = 'Kraków',
  durationMonths = 5,
  confirmedEmployerCompMonthly = 0,
}) {
  const cityData = CITY_LIVING_COSTS[city] || CITY_LIVING_COSTS['Kraków'];
  const countryConfig =
    IPCA_SCHOLARSHIP_CONFIG.countries[cityData.country] ||
    IPCA_SCHOLARSHIP_CONFIG.countries.Poland;

  const monthlyLivingExpenses =
    cityData.rent +
    cityData.utilitiesInternet +
    cityData.foodGroceries +
    cityData.publicTransport +
    cityData.otherLiving;

  const monthlyScholarship = countryConfig.monthlyRateEur;
  const monthlyIncome = monthlyScholarship + Number(confirmedEmployerCompMonthly || 0);
  const monthlyGapOrSurplus = monthlyIncome - monthlyLivingExpenses; // negative = personal contribution needed per month

  const totalRecurringExpenses = monthlyLivingExpenses * durationMonths;
  const oneOffSetupCosts = cityData.travelFromPortugal + cityData.initialDeposit;
  const totalEstimatedExpensesWithSetup = totalRecurringExpenses + oneOffSetupCosts;
  const totalEstimatedExpensesNetDeposit = totalRecurringExpenses + cityData.travelFromPortugal; // assuming deposit returned

  const totalScholarshipSupport = monthlyScholarship * durationMonths;
  const totalEmployerComp = Number(confirmedEmployerCompMonthly || 0) * durationMonths;
  const totalFunding = totalScholarshipSupport + totalEmployerComp;

  const estimatedPersonalContributionNet = Math.max(0, totalEstimatedExpensesNetDeposit - totalFunding);
  const estimatedUpfrontCashNeeded = cityData.initialDeposit + cityData.travelFromPortugal + cityData.rent;

  return {
    city: cityData.city,
    country: cityData.country,
    countryCode: cityData.countryCode,
    scholarshipGroup: countryConfig.group,
    scholarshipMonthlyEur: monthlyScholarship,
    scholarshipSource: IPCA_SCHOLARSHIP_CONFIG.sourceLabel,
    requiresConfirmation: true,
    durationMonths,
    breakdownMonthly: {
      rent: cityData.rent,
      utilitiesInternet: cityData.utilitiesInternet,
      foodGroceries: cityData.foodGroceries,
      publicTransport: cityData.publicTransport,
      otherLiving: cityData.otherLiving,
      totalMonthlyExpenses: monthlyLivingExpenses,
    },
    oneOffCosts: {
      travelFromPortugal: cityData.travelFromPortugal,
      initialDeposit: cityData.initialDeposit,
      upfrontCashBuffer: estimatedUpfrontCashNeeded,
    },
    totalsForDuration: {
      totalLivingAndTravel: totalEstimatedExpensesNetDeposit,
      totalIncludingDeposit: totalEstimatedExpensesWithSetup,
      totalScholarship: totalScholarshipSupport,
      totalConfirmedEmployerComp: totalEmployerComp,
      estimatedPersonalContribution: estimatedPersonalContributionNet,
      monthlyGapOrSurplus,
    },
    typicalPaidStipendRange: cityData.typicalPaidStipendRange,
    housingNote: cityData.housingNote,
    sources: cityData.sources,
    isEstimate: cityData.isEstimate,
  };
}

function getFinancialComparisonPayload(durationMonths = 5) {
  return {
    config: IPCA_SCHOLARSHIP_CONFIG,
    cities: CITY_LIVING_COSTS,
    defaultComparison: {
      polandKrakow: calculateCityFinancialPlan({ city: 'Kraków', durationMonths, confirmedEmployerCompMonthly: 0 }),
      netherlandsAmsterdam: calculateCityFinancialPlan({ city: 'Amsterdam', durationMonths, confirmedEmployerCompMonthly: 0 }),
      netherlandsEindhoven: calculateCityFinancialPlan({ city: 'Eindhoven', durationMonths, confirmedEmployerCompMonthly: 0 }),
      netherlandsRotterdam: calculateCityFinancialPlan({ city: 'Rotterdam', durationMonths, confirmedEmployerCompMonthly: 0 }),
    },
  };
}

module.exports = {
  IPCA_SCHOLARSHIP_CONFIG,
  CITY_LIVING_COSTS,
  calculateCityFinancialPlan,
  getFinancialComparisonPayload,
};

