// Single Source of Truth for IPCA Erasmus+ / Mobility Scholarship & Country/City Financial Comparisons
// Updated for 11 Supported European Countries (Netherlands removed):
// - Group 1 (€650/month): Norway, Denmark
// - Group 2 (€600/month): Estonia, Slovenia, Slovakia, Czechia
// - Group 3 (€550/month): Croatia, Hungary, Bulgaria, Serbia, Poland

const IPCA_SCHOLARSHIP_CONFIG = {
  sourceLabel: 'IPCA scholarship document supplied by user',
  academicYear: '2026/2027',
  defaultDurationMonths: 5,
  placementDeadline: '2026-11-30',
  confirmationNotice:
    'Applicable academic year (2026/2027), exact funded duration (4–5 months, Feb/Mar–Jun/Jul 2027), and eligibility rules require formal confirmation with IPCA (GRI / International Mobility Office). Scholarship alone does not cover all living expenses.',
  countries: {
    // Group 1 (€650/month)
    Norway: {
      country: 'Norway',
      countryCode: 'NO',
      group: 'Group 1',
      monthlyRateEur: 650,
      currencyLocal: 'NOK',
      eurExchangeNote: '1 EUR ≈ 11.75 NOK (Nov 2026 reference)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Denmark: {
      country: 'Denmark',
      countryCode: 'DK',
      group: 'Group 1',
      monthlyRateEur: 650,
      currencyLocal: 'DKK',
      eurExchangeNote: '1 EUR ≈ 7.46 DKK (Pegged to EUR)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },

    // Group 2 (€600/month)
    Estonia: {
      country: 'Estonia',
      countryCode: 'EE',
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'EUR',
      eurExchangeNote: 'Eurozone (EUR)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Slovenia: {
      country: 'Slovenia',
      countryCode: 'SI',
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'EUR',
      eurExchangeNote: 'Eurozone (EUR)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Slovakia: {
      country: 'Slovakia',
      countryCode: 'SK',
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'EUR',
      eurExchangeNote: 'Eurozone (EUR)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Czechia: {
      country: 'Czechia',
      countryCode: 'CZ',
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'CZK',
      eurExchangeNote: '1 EUR ≈ 25.25 CZK (Nov 2026 reference)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },

    // Group 3 (€550/month)
    Poland: {
      country: 'Poland',
      countryCode: 'PL',
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'PLN',
      eurExchangeNote: '1 EUR ≈ 4.30 PLN (Nov 2026 reference)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Croatia: {
      country: 'Croatia',
      countryCode: 'HR',
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'EUR',
      eurExchangeNote: 'Eurozone (EUR)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Hungary: {
      country: 'Hungary',
      countryCode: 'HU',
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'HUF',
      eurExchangeNote: '1 EUR ≈ 400 HUF (Nov 2026 reference)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Bulgaria: {
      country: 'Bulgaria',
      countryCode: 'BG',
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'BGN',
      eurExchangeNote: '1 EUR = 1.95583 BGN (Fixed Currency Board)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Serbia: {
      country: 'Serbia',
      countryCode: 'RS',
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'RSD',
      eurExchangeNote: '1 EUR ≈ 117.0 RSD (Nov 2026 reference)',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
  },
};

// City-specific monthly & one-off cost estimates (EUR) across all 11 supported countries
const CITY_LIVING_COSTS = {
  // --- POLAND (PL — Group 3: €550/mo) ---
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
    housingNote: 'Private student room in Zabłocie / Kazimierz (€460) or AGH/UJ University Dormitory (€150/mo)',
    sources: 'AGH Student Campus, Otodom Kraków, MPK Student Pass, Numbeo (Checked Nov 2026)',
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
    housingNote: 'Shared apartment in Mokotów / Wola (€540) or Politechnika Warszawska DS Riviera (€180/mo)',
    sources: 'Otodom Warsaw Rental Report, ZTM Warszawa Student Pass, Numbeo (Checked Nov 2026)',
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
    housingNote: 'Student room in Wrzeszcz / Oliwa or Politechnika Gdańska Dorms (€155/mo)',
    sources: 'Trojmiasto.pl Rental Listings, ZTM Gdańsk, Numbeo (Checked Nov 2026)',
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
    housingNote: 'Student room in Grunwaldzki or PWr Wittigowo Dorms (€160/mo)',
    sources: 'Otodom Wrocław, MPK Wrocław, Numbeo (Checked Nov 2026)',
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
    housingNote: 'Student room in Jeżyce or Politechnika Poznańska Dorms (€145/mo)',
    sources: 'Otodom Poznań, ZTM Poznań, Numbeo (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- CROATIA (HR — Group 3: €550/mo) ---
  'Zagreb': {
    city: 'Zagreb',
    country: 'Croatia',
    countryCode: 'HR',
    rent: 430,
    utilitiesInternet: 70,
    foodGroceries: 230,
    publicTransport: 15,
    otherLiving: 85,
    travelFromPortugal: 185,
    initialDeposit: 430,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€750 – €1,100/mo (Croatian student contract / Saturn)',
    housingNote: 'Private student room in Trešnjevka (€430) or SCZG Stjepan Radić / Cvjetno naselje Dorm (€120/mo)',
    sources: 'Studentski Centar u Zagrebu (SCZG), Njuškalo Zagreb, ZET Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },
  'Split': {
    city: 'Split',
    country: 'Croatia',
    countryCode: 'HR',
    rent: 410,
    utilitiesInternet: 65,
    foodGroceries: 225,
    publicTransport: 18,
    otherLiving: 80,
    travelFromPortugal: 195,
    initialDeposit: 410,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€700 – €1,000/mo (Croatian student rate)',
    housingNote: 'Student room in Split3 (€410) or Kampus Dr. Franjo Tuđman Student Dorm (€130/mo)',
    sources: 'SC Split Kampus Dorms, Njuškalo Split, Promet Split (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- HUNGARY (HU — Group 3: €550/mo) ---
  'Budapest': {
    city: 'Budapest',
    country: 'Hungary',
    countryCode: 'HU',
    rent: 420,
    utilitiesInternet: 70,
    foodGroceries: 215,
    publicTransport: 10,
    otherLiving: 85,
    travelFromPortugal: 155,
    initialDeposit: 420,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€750 – €1,150/mo (Hungarian engineering trainee rate)',
    housingNote: 'Shared flat in District XI / IX (€420) or BME Schönherz / ELTE Kőrösi Dormitory (€135/mo)',
    sources: 'BME & ELTE Dormitory Tariffs, Ingatlan.com Budapest, BKK Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- ESTONIA (EE — Group 2: €600/mo) ---
  'Tallinn': {
    city: 'Tallinn',
    country: 'Estonia',
    countryCode: 'EE',
    rent: 460,
    utilitiesInternet: 85,
    foodGroceries: 245,
    publicTransport: 20,
    otherLiving: 95,
    travelFromPortugal: 210,
    initialDeposit: 460,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€900 – €1,400/mo (Estonian tech intern stipend)',
    housingNote: 'Private room near Ülemiste / Mustamäe (€460) or TalTech Student Campus Dormitory (€165/mo)',
    sources: 'TalTech Student Campus (Üliõpilasküla), KV.ee Tallinn, TLT Transit (Checked Nov 2026)',
    isEstimate: true,
  },
  'Tartu': {
    city: 'Tartu',
    country: 'Estonia',
    countryCode: 'EE',
    rent: 390,
    utilitiesInternet: 75,
    foodGroceries: 230,
    publicTransport: 15,
    otherLiving: 85,
    travelFromPortugal: 225,
    initialDeposit: 390,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€800 – €1,250/mo (Tartu software intern rate)',
    housingNote: 'University of Tartu Student Village (Tartu Üliõpilasküla Raatuse 22 — €160/mo) or private room (€390)',
    sources: 'Tartu Student Village (campus.ee), KV.ee Tartu (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- BULGARIA (BG — Group 3: €550/mo) ---
  'Sofia': {
    city: 'Sofia',
    country: 'Bulgaria',
    countryCode: 'BG',
    rent: 360,
    utilitiesInternet: 65,
    foodGroceries: 195,
    publicTransport: 12,
    otherLiving: 75,
    travelFromPortugal: 175,
    initialDeposit: 360,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€700 – €1,100/mo (1,400–2,200 BGN Sofia tech intern stipend)',
    housingNote: 'Studentski Grad TU Sofia / Sofia Univ. Dormitory (€95/mo!) or private apartment room (€360/mo)',
    sources: 'TU Sofia & Sofia Univ. Studentski Grad Dorms, Imot.bg, Sofia Urban Mobility (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- SERBIA (RS — Group 3: €550/mo) ---
  'Belgrade': {
    city: 'Belgrade',
    country: 'Serbia',
    countryCode: 'RS',
    rent: 380,
    utilitiesInternet: 65,
    foodGroceries: 195,
    publicTransport: 12,
    otherLiving: 75,
    travelFromPortugal: 190,
    initialDeposit: 380,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€600 – €950/mo (Serbian IT intern stipend)',
    housingNote: 'Studentski Grad Novi Beograd Dorm (€110/mo) or private room near New Belgrade tech hub (€380/mo)',
    sources: 'Studentski Centar Beograd, Halo Oglasi, Belgrade Public Transit (Checked Nov 2026)',
    isEstimate: true,
  },
  'Novi Sad': {
    city: 'Novi Sad',
    country: 'Serbia',
    countryCode: 'RS',
    rent: 330,
    utilitiesInternet: 60,
    foodGroceries: 185,
    publicTransport: 10,
    otherLiving: 70,
    travelFromPortugal: 195,
    initialDeposit: 330,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€550 – €900/mo (Novi Sad IT intern stipend)',
    housingNote: 'Studentski Centar Novi Sad Liman Campus Dorm (€100/mo) right next to Vega IT & Vivify Ideas!',
    sources: 'Studentski Centar Novi Sad, 4zida Novi Sad, JGSP (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- SLOVENIA (SI — Group 2: €600/mo) ---
  'Ljubljana': {
    city: 'Ljubljana',
    country: 'Slovenia',
    countryCode: 'SI',
    rent: 470,
    utilitiesInternet: 80,
    foodGroceries: 240,
    publicTransport: 20,
    otherLiving: 90,
    travelFromPortugal: 190,
    initialDeposit: 470,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€850 – €1,250/mo (Slovenian študentsko delo tech rate)',
    housingNote: 'Študentski dom Ljubljana Rožna dolina (€165/mo) + subsidized student meals (Študentski boni ~€3.50/meal!)',
    sources: 'Študentski dom Ljubljana (stud-dom-lj.si), Nepremicnine.net, LPP Urbana (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- SLOVAKIA (SK — Group 2: €600/mo) ---
  'Bratislava': {
    city: 'Bratislava',
    country: 'Slovakia',
    countryCode: 'SK',
    rent: 460,
    utilitiesInternet: 75,
    foodGroceries: 230,
    publicTransport: 18,
    otherLiving: 85,
    travelFromPortugal: 170,
    initialDeposit: 460,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€850 – €1,250/mo (5–8 EUR/hr Slovak brigáda / intern rate)',
    housingNote: 'STU Mladá Garda / Mlynská dolina University Dormitory (€135/mo) or private room (€460/mo)',
    sources: 'STU & Comenius University Mlynská dolina Dorms, Nehnutelnosti.sk, IDS BK (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- CZECHIA (CZ — Group 2: €600/mo) ---
  'Prague': {
    city: 'Prague',
    country: 'Czechia',
    countryCode: 'CZ',
    rent: 530,
    utilitiesInternet: 85,
    foodGroceries: 245,
    publicTransport: 12,
    otherLiving: 95,
    travelFromPortugal: 160,
    initialDeposit: 530,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€950 – €1,400/mo (Czech DPP/DPČ student engineering rate)',
    housingNote: 'CTU (ČVUT) Strahov / Podolí / Sinkuleho Dorms (€165/mo) right near Ackee & STRV or shared flat (€530/mo)',
    sources: 'ČVUT SÚZ & Charles Univ. Koleje a menzy, Bezrealitky Prague, PID Lítačka Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },
  'Brno': {
    city: 'Brno',
    country: 'Czechia',
    countryCode: 'CZ',
    rent: 430,
    utilitiesInternet: 75,
    foodGroceries: 225,
    publicTransport: 11,
    otherLiving: 85,
    travelFromPortugal: 175,
    initialDeposit: 430,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€850 – €1,250/mo (Brno tech intern rate)',
    housingNote: 'BUT (VUT) Koleje Pod Palackého vrchem / Masaryk Univ. Vinařská Dorms (€150/mo) or private room (€430/mo)',
    sources: 'VUT & MUNI Brno Dormitory Tariffs, Bezrealitky Brno, DPMB Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- NORWAY (NO — Group 1: €650/mo) ---
  'Oslo': {
    city: 'Oslo',
    country: 'Norway',
    countryCode: 'NO',
    rent: 760,
    utilitiesInternet: 95,
    foodGroceries: 340,
    publicTransport: 48,
    otherLiving: 130,
    travelFromPortugal: 185,
    initialDeposit: 760,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€1,600 – €2,400/mo (if paid Norwegian tech internship)',
    housingNote: 'SiO Student Housing (Kringsjå / Sogn Student Village ~€445/mo incl. utilities) vs private room (€760/mo)',
    sources: 'SiO (Studentsamskipnaden i Oslo), Hybel.no, Ruter Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },

  // --- DENMARK (DK — Group 1: €650/mo) ---
  'Copenhagen': {
    city: 'Copenhagen',
    country: 'Denmark',
    countryCode: 'DK',
    rent: 780,
    utilitiesInternet: 95,
    foodGroceries: 320,
    publicTransport: 55,
    otherLiving: 125,
    travelFromPortugal: 170,
    initialDeposit: 780,
    typicalConfirmedCompensation: 0,
    typicalPaidStipendRange: '€450 – €1,200/mo (Danish erkendtlighed / paid tech trainee)',
    housingNote: 'KKIK / Kollegiernes Kontor Student Dorms (Grønjordskollegiet / Øresundskollegiet ~€450/mo) vs private room (€780/mo)',
    sources: 'KKIK (Kollegiernes Kontor i København), BoligPortal, DOT Ungdomskort (Checked Nov 2026)',
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
  const monthlyGapOrSurplus = monthlyIncome - monthlyLivingExpenses;

  const totalRecurringExpenses = monthlyLivingExpenses * durationMonths;
  const oneOffSetupCosts = cityData.travelFromPortugal + cityData.initialDeposit;
  const totalEstimatedExpensesWithSetup = totalRecurringExpenses + oneOffSetupCosts;
  const totalEstimatedExpensesNetDeposit = totalRecurringExpenses + cityData.travelFromPortugal;

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
      croatiaZagreb: calculateCityFinancialPlan({ city: 'Zagreb', durationMonths, confirmedEmployerCompMonthly: 0 }),
      czechiaPrague: calculateCityFinancialPlan({ city: 'Prague', durationMonths, confirmedEmployerCompMonthly: 0 }),
      denmarkCopenhagen: calculateCityFinancialPlan({ city: 'Copenhagen', durationMonths, confirmedEmployerCompMonthly: 0 }),
    },
  };
}

module.exports = {
  IPCA_SCHOLARSHIP_CONFIG,
  CITY_LIVING_COSTS,
  calculateCityFinancialPlan,
  getFinancialComparisonPayload,
};
