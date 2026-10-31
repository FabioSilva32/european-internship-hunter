export interface CityLivingCost {
  city: string;
  country: 'Poland' | 'Netherlands';
  countryCode: 'PL' | 'NL';
  rent: number;
  utilitiesInternet: number;
  foodGroceries: number;
  publicTransport: number;
  otherLiving: number;
  travelFromPortugal: number;
  initialDeposit: number;
  typicalPaidStipendRange: string;
  housingNote: string;
  sources: string;
  isEstimate: boolean;
}

export const IPCA_SCHOLARSHIP_CONFIG = {
  sourceLabel: 'IPCA scholarship document supplied by user',
  academicYear: '2026/2027',
  defaultDurationMonths: 5,
  confirmationNotice:
    'Applicable academic year (2026/2027), exact funding duration (~4–5 months), and eligibility rules require formal confirmation with IPCA (GRI). Do not assume the scholarship covers all expenses.',
  countries: {
    Poland: {
      country: 'Poland' as const,
      countryCode: 'PL' as const,
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'PLN',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Netherlands: {
      country: 'Netherlands' as const,
      countryCode: 'NL' as const,
      group: 'Group 1',
      monthlyRateEur: 650,
      currencyLocal: 'EUR',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
  },
};

export const CITY_LIVING_COSTS: Record<string, CityLivingCost> = {
  // POLAND (PL)
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
    typicalPaidStipendRange: '€1,000 – €1,400/mo (4,300–6,000 PLN if paid vacancy)',
    housingNote: 'Student room in Jeżyce / Łazarz / Centrum',
    sources: 'Otodom Poznań, ZTM Poznań, Numbeo (Checked Oct 2026)',
    isEstimate: true,
  },

  // NETHERLANDS (NL)
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
    typicalPaidStipendRange: '€500 – €850/mo (Standard Dutch stagevergoeding)',
    housingNote: 'Student room via Kamernet / HousingAnywhere / DUWO (book 3+ months ahead)',
    sources: 'HousingAnywhere International Rent Index Q3 2026, Kamernet, GVB / NS OV-chipkaart, Nibud (Checked Oct 2026)',
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
    typicalPaidStipendRange: '€450 – €750/mo (Brainport Tech & Agency stagevergoeding)',
    housingNote: 'Brainport tech hub; direct flights from Porto/Lisbon to Eindhoven Airport',
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
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: 'Strong game dev & SaaS hub in North Brabant (close to Eindhoven & Rotterdam)',
    sources: 'Klik voor Kamers / Kamernet Breda 2026, Arriva / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
};

export const POLISH_CITIES = ['Kraków', 'Warsaw', 'Gdańsk', 'Wrocław', 'Poznań'];
export const DUTCH_CITIES = [
  'Amsterdam',
  'Rotterdam',
  'Utrecht',
  'Eindhoven',
  'The Hague',
  'Groningen',
  'Delft',
  'Leiden',
  'Arnhem',
  'Breda',
];

export function calculateCityFinancials(
  cityName: string,
  durationMonths: number = 5,
  confirmedEmployerCompMonthly: number = 0
) {
  const city = CITY_LIVING_COSTS[cityName] || CITY_LIVING_COSTS['Kraków'];
  const scholarshipConfig =
    IPCA_SCHOLARSHIP_CONFIG.countries[city.country] || IPCA_SCHOLARSHIP_CONFIG.countries.Poland;

  const monthlyExpenses =
    city.rent +
    city.utilitiesInternet +
    city.foodGroceries +
    city.publicTransport +
    city.otherLiving;

  const monthlyScholarship = scholarshipConfig.monthlyRateEur;
  const monthlySupportTotal = monthlyScholarship + confirmedEmployerCompMonthly;
  const monthlyGapOrSurplus = monthlySupportTotal - monthlyExpenses;

  const totalRecurring = monthlyExpenses * durationMonths;
  const totalOneOffWithDeposit = city.travelFromPortugal + city.initialDeposit;
  const totalExpensesNetDeposit = totalRecurring + city.travelFromPortugal;
  const totalExpensesGross = totalRecurring + totalOneOffWithDeposit;

  const totalScholarship = monthlyScholarship * durationMonths;
  const totalEmployerComp = confirmedEmployerCompMonthly * durationMonths;
  const totalFunding = totalScholarship + totalEmployerComp;

  const estimatedPersonalContribution = Math.max(0, totalExpensesNetDeposit - totalFunding);

  return {
    city,
    scholarshipGroup: scholarshipConfig.group,
    monthlyScholarship,
    confirmedEmployerCompMonthly,
    durationMonths,
    monthlyExpenses,
    monthlySupportTotal,
    monthlyGapOrSurplus,
    totalRecurring,
    totalOneOffWithDeposit,
    totalExpensesNetDeposit,
    totalExpensesGross,
    totalScholarship,
    totalEmployerComp,
    totalFunding,
    estimatedPersonalContribution,
  };
}

