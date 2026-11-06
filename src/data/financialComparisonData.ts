export type SupportedCountryName =
  | 'Poland'
  | 'Croatia'
  | 'Hungary'
  | 'Estonia'
  | 'Bulgaria'
  | 'Serbia'
  | 'Slovenia'
  | 'Slovakia'
  | 'Czechia'
  | 'Norway'
  | 'Denmark';

export type SupportedCountryCode =
  | 'PL'
  | 'HR'
  | 'HU'
  | 'EE'
  | 'BG'
  | 'RS'
  | 'SI'
  | 'SK'
  | 'CZ'
  | 'NO'
  | 'DK';

export interface CountryMetadata {
  country: SupportedCountryName;
  countryCode: SupportedCountryCode;
  group: 'Group 1' | 'Group 2' | 'Group 3';
  monthlyRateEur: 650 | 600 | 550;
  currencyLocal: string;
  cities: string[];
  badgeColor: string;
}

export const SUPPORTED_COUNTRIES_LIST: CountryMetadata[] = [
  {
    country: 'Poland',
    countryCode: 'PL',
    group: 'Group 3',
    monthlyRateEur: 550,
    currencyLocal: 'PLN',
    cities: ['Kraków', 'Warsaw', 'Gdańsk', 'Wrocław', 'Poznań'],
    badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  },
  {
    country: 'Croatia',
    countryCode: 'HR',
    group: 'Group 3',
    monthlyRateEur: 550,
    currencyLocal: 'EUR',
    cities: ['Zagreb', 'Split'],
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  },
  {
    country: 'Hungary',
    countryCode: 'HU',
    group: 'Group 3',
    monthlyRateEur: 550,
    currencyLocal: 'HUF',
    cities: ['Budapest'],
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  {
    country: 'Estonia',
    countryCode: 'EE',
    group: 'Group 2',
    monthlyRateEur: 600,
    currencyLocal: 'EUR',
    cities: ['Tallinn', 'Tartu'],
    badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  },
  {
    country: 'Bulgaria',
    countryCode: 'BG',
    group: 'Group 3',
    monthlyRateEur: 550,
    currencyLocal: 'BGN',
    cities: ['Sofia'],
    badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  },
  {
    country: 'Serbia',
    countryCode: 'RS',
    group: 'Group 3',
    monthlyRateEur: 550,
    currencyLocal: 'RSD',
    cities: ['Belgrade', 'Novi Sad'],
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  },
  {
    country: 'Slovenia',
    countryCode: 'SI',
    group: 'Group 2',
    monthlyRateEur: 600,
    currencyLocal: 'EUR',
    cities: ['Ljubljana'],
    badgeColor: 'bg-lime-500/15 text-lime-300 border-lime-500/30',
  },
  {
    country: 'Slovakia',
    countryCode: 'SK',
    group: 'Group 2',
    monthlyRateEur: 600,
    currencyLocal: 'EUR',
    cities: ['Bratislava'],
    badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  },
  {
    country: 'Czechia',
    countryCode: 'CZ',
    group: 'Group 2',
    monthlyRateEur: 600,
    currencyLocal: 'CZK',
    cities: ['Prague', 'Brno'],
    badgeColor: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  },
  {
    country: 'Norway',
    countryCode: 'NO',
    group: 'Group 1',
    monthlyRateEur: 650,
    currencyLocal: 'NOK',
    cities: ['Oslo'],
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  },
  {
    country: 'Denmark',
    countryCode: 'DK',
    group: 'Group 1',
    monthlyRateEur: 650,
    currencyLocal: 'DKK',
    cities: ['Copenhagen'],
    badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  },
];

export function getCountryMeta(countryOrCode?: string): CountryMetadata {
  const c = (countryOrCode || 'Poland').trim().toLowerCase();
  return (
    SUPPORTED_COUNTRIES_LIST.find(
      (item) =>
        item.country.toLowerCase() === c ||
        item.countryCode.toLowerCase() === c
    ) || SUPPORTED_COUNTRIES_LIST[0]
  );
}

export interface UniversityDormOption {
  id: string;
  name: string;
  university: string;
  city: string;
  country: SupportedCountryName;
  addressOrDistrict: string;
  monthlyPriceEur: number;
  monthlyPriceRangeText: string;
  depositEur: number;
  utilitiesIncluded: boolean;
  proximityToTechHubs: string;
  eligibilityNote: string;
  bookingUrl: string;
  mapsQuery: string;
}

export interface CityLivingCost {
  city: string;
  country: SupportedCountryName;
  countryCode: SupportedCountryCode;
  // Private room / shared flat (or budget apartment)
  rent: number;
  utilitiesInternet: number;
  initialDeposit: number;
  // University Student Dormitory / Campus Housing
  dormRent: number;
  dormUtilitiesInternet: number;
  dormDeposit: number;
  dormNote: string;
  // Common living costs
  foodGroceries: number;
  publicTransport: number;
  otherLiving: number;
  travelFromPortugal: number;
  typicalPaidStipendRange: string;
  housingNote: string;
  sources: string;
  isEstimate: boolean;
}

export const IPCA_SCHOLARSHIP_CONFIG = {
  sourceLabel: 'IPCA scholarship document supplied by user',
  academicYear: '2026/2027',
  defaultDurationMonths: 5,
  placementDeadline: '30 November 2026',
  confirmationNotice:
    'Applicable academic year (2026/2027), exact funding duration (~4–5 months, Feb/Mar to Jun/Jul 2027), and eligibility rules require formal confirmation with IPCA (GRI). Do not assume the scholarship covers all expenses.',
  countries: {
    // Group 1 (€650/month)
    Norway: {
      country: 'Norway' as const,
      countryCode: 'NO' as const,
      group: 'Group 1',
      monthlyRateEur: 650,
      currencyLocal: 'NOK',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Denmark: {
      country: 'Denmark' as const,
      countryCode: 'DK' as const,
      group: 'Group 1',
      monthlyRateEur: 650,
      currencyLocal: 'DKK',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    // Group 2 (€600/month)
    Estonia: {
      country: 'Estonia' as const,
      countryCode: 'EE' as const,
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'EUR',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Slovenia: {
      country: 'Slovenia' as const,
      countryCode: 'SI' as const,
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'EUR',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Slovakia: {
      country: 'Slovakia' as const,
      countryCode: 'SK' as const,
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'EUR',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Czechia: {
      country: 'Czechia' as const,
      countryCode: 'CZ' as const,
      group: 'Group 2',
      monthlyRateEur: 600,
      currencyLocal: 'CZK',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    // Group 3 (€550/month)
    Poland: {
      country: 'Poland' as const,
      countryCode: 'PL' as const,
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'PLN',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Croatia: {
      country: 'Croatia' as const,
      countryCode: 'HR' as const,
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'EUR',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Hungary: {
      country: 'Hungary' as const,
      countryCode: 'HU' as const,
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'HUF',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Bulgaria: {
      country: 'Bulgaria' as const,
      countryCode: 'BG' as const,
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'BGN',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
    Serbia: {
      country: 'Serbia' as const,
      countryCode: 'RS' as const,
      group: 'Group 3',
      monthlyRateEur: 550,
      currencyLocal: 'RSD',
      source: 'IPCA scholarship document supplied by user',
      requiresConfirmation: true,
    },
  } as Record<SupportedCountryName, {
    country: SupportedCountryName;
    countryCode: SupportedCountryCode;
    group: string;
    monthlyRateEur: number;
    currencyLocal: string;
    source: string;
    requiresConfirmation: boolean;
  }>,
};

export const UNIVERSITY_DORMS_BY_CITY: Record<string, UniversityDormOption[]> = {
  // ================= POLAND (PL — Group 3: €550/mo) =================
  'Kraków': [
    {
      id: 'dorm-krk-agh',
      name: 'Miasteczko Studenckie AGH (AGH University Student Campus)',
      university: 'AGH University of Krakow',
      city: 'Kraków',
      country: 'Poland',
      addressOrDistrict: 'ul. Rostafińskiego / Tokarskiego, Krowodrza, Kraków',
      monthlyPriceEur: 145,
      monthlyPriceRangeText: '€130 – €175/mo (550 – 750 PLN/mo, utilities & Wi-Fi included)',
      depositEur: 150,
      utilitiesIncluded: true,
      proximityToTechHubs: '~15–20 min by tram to Bloober Team, Brainly (Zabłocie) & Flying Wild Hog',
      eligibilityNote: 'Accepts Erasmus+ & external university interns/students (apply via AGH Student Campus portal)',
      bookingUrl: 'https://akademik.agh.edu.pl/en',
      mapsQuery: 'Miasteczko+Studenckie+AGH+Krakow',
    },
    {
      id: 'dorm-krk-uj',
      name: 'Dom Studencki "Piast" & "Bydgoska" (Jagiellonian University)',
      university: 'Jagiellonian University (UJ)',
      city: 'Kraków',
      country: 'Poland',
      addressOrDistrict: 'ul. Piastowska 47 / ul. Bydgoska 19, Kraków',
      monthlyPriceEur: 165,
      monthlyPriceRangeText: '€145 – €195/mo (620 – 840 PLN/mo)',
      depositEur: 165,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Direct tram line to Kraków City Center, Kazimierz & Zabłocie tech cluster (~18 min)',
      eligibilityNote: 'External international students & Erasmus trainees can request guest/semester placement',
      bookingUrl: 'https://studenci.uj.edu.pl/en_GB/akademiki',
      mapsQuery: 'Dom+Studencki+Piast+Piastowska+47+Krakow',
    },
    {
      id: 'dorm-krk-pk',
      name: 'Osiedle Studenckie Politechniki Krakowskiej (Czyżyny Dorms DS-1 to DS-4)',
      university: 'Cracow University of Technology (Politechnika Krakowska)',
      city: 'Kraków',
      country: 'Poland',
      addressOrDistrict: 'ul. Skarżyńskiego 3–9, Czyżyny, Kraków',
      monthlyPriceEur: 150,
      monthlyPriceRangeText: '€135 – €180/mo (580 – 780 PLN/mo)',
      depositEur: 150,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12 min tram ride to eastern Kraków studios & ~20 min to Zabłocie / Rynek',
      eligibilityNote: 'Accepts students from other universities via guest/semester application form',
      bookingUrl: 'https://akademiki.pk.edu.pl/',
      mapsQuery: 'Osiedle+Studenckie+Politechniki+Krakowskiej+Skarzynskiego+Krakow',
    },
  ],
  'Warsaw': [
    {
      id: 'dorm-waw-pw-riviera',
      name: 'DS "Riviera" & DS "Akademik" (Warsaw University of Technology)',
      university: 'Warsaw University of Technology (Politechnika Warszawska)',
      city: 'Warsaw',
      country: 'Poland',
      addressOrDistrict: 'ul. Waryńskiego 12 (Metro Politechnika), Śródmieście, Warsaw',
      monthlyPriceEur: 185,
      monthlyPriceRangeText: '€160 – €220/mo (680 – 950 PLN/mo, utilities included)',
      depositEur: 190,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Central metro hub: ~15–22 min to CD Projekt RED, 11 bit studios, People Can Fly & Allegro',
      eligibilityNote: 'Accepts visiting & Erasmus+ students when vacant beds are available (apply via SSZ PW)',
      bookingUrl: 'https://sspw.pl/akademiki/',
      mapsQuery: 'Dom+Studencki+Riviera+Warynskiego+12+Warszawa',
    },
    {
      id: 'dorm-waw-uw',
      name: 'Dom Studencki nr 1 "Muchomorek" & DS nr 2 "Żwirek" (University of Warsaw)',
      university: 'University of Warsaw (UW)',
      city: 'Warsaw',
      country: 'Poland',
      addressOrDistrict: 'ul. Żwirki i Wigury 95/97, Ochota, Warsaw',
      monthlyPriceEur: 175,
      monthlyPriceRangeText: '€150 – €210/mo (650 – 900 PLN/mo)',
      depositEur: 180,
      utilitiesIncluded: true,
      proximityToTechHubs: '~15 min bus/tram to Warsaw business district (Rondo Daszyńskiego / Mokotów) & airport',
      eligibilityNote: 'Open to Erasmus+ and visiting international students via UW Office for Student Affairs',
      bookingUrl: 'https://bss.uw.edu.pl/en/dormitories/',
      mapsQuery: 'Dom+Studencki+Zwirek+Zwirki+i+Wigury+95+Warszawa',
    },
  ],
  'Gdańsk': [
    {
      id: 'dorm-gda-pg',
      name: 'Domy Studenckie Politechniki Gdańskiej (DS 1–12 Wrzeszcz Campus)',
      university: 'Gdańsk University of Technology (Politechnika Gdańska)',
      city: 'Gdańsk',
      country: 'Poland',
      addressOrDistrict: 'ul. Traugutta / ul. Wyspiańskiego, Wrzeszcz, Gdańsk',
      monthlyPriceEur: 155,
      monthlyPriceRangeText: '€135 – €185/mo (580 – 790 PLN/mo)',
      depositEur: 160,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Right in Wrzeszcz tech district (~8–12 min to Gdańsk tech offices & SKM train)',
      eligibilityNote: 'Accepts Erasmus+ & external students for semester or short-term stays',
      bookingUrl: 'https://pg.edu.pl/en/students/accommodation',
      mapsQuery: 'Dom+Studencki+Politechniki+Gdanskiej+Wyspianskiego+Gdansk',
    },
    {
      id: 'dorm-gda-ug',
      name: 'Domy Studenckie Uniwersytetu Gdańskiego (Oliwa Campus)',
      university: 'University of Gdańsk (UG)',
      city: 'Gdańsk',
      country: 'Poland',
      addressOrDistrict: 'ul. Polanki, Oliwa, Gdańsk (near Olivia Business Centre & Alchemia)',
      monthlyPriceEur: 160,
      monthlyPriceRangeText: '€140 – €190/mo (600 – 820 PLN/mo)',
      depositEur: 160,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Walking distance (~10 min) to Oliwa IT hub (Olivia Centre / Alchemia)',
      eligibilityNote: 'Visiting & Erasmus+ traineeship students can apply for guest/semester rooms',
      bookingUrl: 'https://ug.edu.pl/studenci/studia_i_staze_zagraniczne_erasmus/zakwaterowanie',
      mapsQuery: 'Dom+Studencki+Uniwersytetu+Gdanskiego+Polanki+Gdansk',
    },
  ],
  'Wrocław': [
    {
      id: 'dorm-wro-pwr',
      name: 'Wittigowo Student Campus (DS T-15 to T-19 Politechnika Wrocławska)',
      university: 'Wrocław University of Science and Technology (PWr)',
      city: 'Wrocław',
      country: 'Poland',
      addressOrDistrict: 'ul. Wittiga 4–8, Biskupin / Śródmieście, Wrocław',
      monthlyPriceEur: 155,
      monthlyPriceRangeText: '€140 – €185/mo (600 – 800 PLN/mo)',
      depositEur: 160,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12–18 min tram to Techland, Ten Square Games & Wrocław market square',
      eligibilityNote: 'Accepts Erasmus+ and external students subject to availability',
      bookingUrl: 'https://pwr.edu.pl/en/university/Student-life/accommodation',
      mapsQuery: 'Wittigowo+Domy+Studenckie+Wittiga+Wroclaw',
    },
    {
      id: 'dorm-wro-uwr',
      name: 'Dom Studencki "Kredka" & "Ołówek" (University of Wrocław)',
      university: 'University of Wrocław (UWr)',
      city: 'Wrocław',
      country: 'Poland',
      addressOrDistrict: 'pl. Grunwaldzki 30, Wrocław',
      monthlyPriceEur: 170,
      monthlyPriceRangeText: '€155 – €200/mo (660 – 860 PLN/mo)',
      depositEur: 170,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Iconic central student towers at Plac Grunwaldzki (~10 min to city center tech hubs)',
      eligibilityNote: 'Open to international Erasmus+ students & visiting trainees',
      bookingUrl: 'https://uwr.edu.pl/en/erasmus-incoming-students/accommodation/',
      mapsQuery: 'Dom+Studencki+Kredka+Olowek+Grunwaldzki+Wroclaw',
    },
  ],
  'Poznań': [
    {
      id: 'dorm-poz-pp',
      name: 'Kampus Piotrowo Dormitories (DS 1–6 Politechnika Poznańska)',
      university: 'Poznań University of Technology (Politechnika Poznańska)',
      city: 'Poznań',
      country: 'Poland',
      addressOrDistrict: 'ul. Jana Pawła II / Kórnicka, Piotrowo, Poznań',
      monthlyPriceEur: 145,
      monthlyPriceRangeText: '€130 – €175/mo (560 – 750 PLN/mo)',
      depositEur: 150,
      utilitiesIncluded: true,
      proximityToTechHubs: '~10 min tram to Apptension, Netguru & central Poznań offices',
      eligibilityNote: 'Accepts Erasmus+ & external Polish/EU university students',
      bookingUrl: 'https://put.poznan.pl/en/dormitories',
      mapsQuery: 'Domy+Studenckie+Politechnika+Poznanska+Kornicka+Poznan',
    },
  ],

  // ================= CROATIA (HR — Group 3: €550/mo) =================
  'Zagreb': [
    {
      id: 'dorm-zag-sczg',
      name: 'Studentski dom "Stjepan Radić" & "Cvjetno naselje" (SCZG Zagreb)',
      university: 'University of Zagreb (Studentski Centar u Zagrebu)',
      city: 'Zagreb',
      country: 'Croatia',
      addressOrDistrict: 'Jarunska ul. 2 / Odranska ul. 8, Trešnjevka, Zagreb',
      monthlyPriceEur: 120,
      monthlyPriceRangeText: '€95 – €145/mo (utilities & internet included)',
      depositEur: 120,
      utilitiesIncluded: true,
      proximityToTechHubs: '~10–15 min tram to Infinum (Strojarska), Q Agency & Cinnamon Agency',
      eligibilityNote: 'Official University of Zagreb student dorms; Erasmus+ trainees & international students eligible',
      bookingUrl: 'https://www.sczg.unizg.hr/smjestaj/',
      mapsQuery: 'Studentski+dom+Cvjetno+naselje+Odranska+8+Zagreb',
    },
  ],
  'Split': [
    {
      id: 'dorm-spl-kampus',
      name: 'Studentski dom "Dr. Franjo Tuđman" (University of Split Campus)',
      university: 'University of Split (Studentski centar Split)',
      city: 'Split',
      country: 'Croatia',
      addressOrDistrict: 'Cvite Fiskovića 3, Split 3 (University Campus)',
      monthlyPriceEur: 130,
      monthlyPriceRangeText: '€110 – €150/mo (utilities & Wi-Fi included)',
      depositEur: 130,
      utilitiesIncluded: true,
      proximityToTechHubs: '~8 min walk/bus to Profico & Split3 tech offices',
      eligibilityNote: 'Modern university campus dormitory in Split accepting Erasmus+ and visiting students',
      bookingUrl: 'https://www.scst.unist.hr/',
      mapsQuery: 'Studentski+dom+Dr+Franjo+Tudman+Split',
    },
  ],

  // ================= HUNGARY (HU — Group 3: €550/mo) =================
  'Budapest': [
    {
      id: 'dorm-bud-bme',
      name: 'BME Schönherz & Kármán Tódor Dormitories / ELTE Kőrösi Csoma Sándor',
      university: 'Budapest University of Technology (BME) & ELTE',
      city: 'Budapest',
      country: 'Hungary',
      addressOrDistrict: 'Irinyi József u. 42 (District XI — Újbuda Infopark), Budapest',
      monthlyPriceEur: 135,
      monthlyPriceRangeText: '€115 – €165/mo (utilities & campus gigabit internet included)',
      depositEur: 150,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12–18 min metro/tram to UX studio, Supercharge & Wanari in Budapest',
      eligibilityNote: 'Accepts Erasmus+ & visiting EU university students via BME/ELTE Housing Office',
      bookingUrl: 'https://www.elte.hu/en/dormitories',
      mapsQuery: 'Schonherz+Kollegium+Irinyi+Jozsef+42+Budapest',
    },
  ],

  // ================= ESTONIA (EE — Group 2: €600/mo) =================
  'Tallinn': [
    {
      id: 'dorm-tal-taltech',
      name: 'TalTech Student Campus (Akadeemia tee 5 / 7 / 11 Dormitories)',
      university: 'Tallinn University of Technology (TalTech)',
      city: 'Tallinn',
      country: 'Estonia',
      addressOrDistrict: 'Akadeemia tee 7 / Raja 4D, Mustamäe, Tallinn',
      monthlyPriceEur: 165,
      monthlyPriceRangeText: '€140 – €195/mo (all utilities & Wi-Fi included)',
      depositEur: 175,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Direct bus/trolley to Helmes (Ülemiste City) & central Tallinn tech studios (~20 min)',
      eligibilityNote: 'TalTech Student Campus (Üliõpilasküla) accepts international students & Erasmus+ interns',
      bookingUrl: 'https://taltech.ee/en/accomodation',
      mapsQuery: 'TalTech+Student+Campus+Akadeemia+tee+7+Tallinn',
    },
  ],
  'Tartu': [
    {
      id: 'dorm-tar-village',
      name: 'Tartu Student Village (Raatuse 22 & Narva mnt 25 — University of Tartu)',
      university: 'University of Tartu (Tartu Üliõpilasküla)',
      city: 'Tartu',
      country: 'Estonia',
      addressOrDistrict: 'Raatuse 22 / Narva mnt 25, Tartu City Centre',
      monthlyPriceEur: 160,
      monthlyPriceRangeText: '€135 – €190/mo (utilities & Wi-Fi included)',
      depositEur: 160,
      utilitiesIncluded: true,
      proximityToTechHubs: '5–8 min walk to Bitweb, Mooncascade & University of Tartu Delta Tech Centre!',
      eligibilityNote: 'Official Tartu Student Village (campus.ee) open to international students & interns',
      bookingUrl: 'https://www.campus.ee/en/',
      mapsQuery: 'Raatuse+22+Student+Hostel+Tartu',
    },
  ],

  // ================= BULGARIA (BG — Group 3: €550/mo) =================
  'Sofia': [
    {
      id: 'dorm-sof-studgrad',
      name: 'Studentski Grad (Student Town) — TU Sofia & Sofia University Dorms',
      university: 'Technical University of Sofia (TU Sofia) & Sofia University',
      city: 'Sofia',
      country: 'Bulgaria',
      addressOrDistrict: 'Studentski Grad (Student Town), District Mladost / Vitosha, Sofia',
      monthlyPriceEur: 95,
      monthlyPriceRangeText: '€75 – €120/mo (utilities included)',
      depositEur: 100,
      utilitiesIncluded: true,
      proximityToTechHubs: '~15 min metro/bus to MentorMate, Despark & DevriX in Sofia tech districts',
      eligibilityNote: 'Largest university student campus in Bulgaria; accepts Erasmus+ & visiting EU students',
      bookingUrl: 'https://tu-sofia.bg/university/307',
      mapsQuery: 'Studentski+Grad+Technical+University+of+Sofia',
    },
  ],

  // ================= SERBIA (RS — Group 3: €550/mo) =================
  'Belgrade': [
    {
      id: 'dorm-beg-studgrad',
      name: 'Studentski Grad Novi Beograd (University of Belgrade Student Center)',
      university: 'University of Belgrade (Studentski Centar Beograd)',
      city: 'Belgrade',
      country: 'Serbia',
      addressOrDistrict: 'Tošin bunar 143–151, Novi Beograd (New Belgrade), Belgrade',
      monthlyPriceEur: 110,
      monthlyPriceRangeText: '€90 – €135/mo (utilities included)',
      depositEur: 110,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Located right in New Belgrade (Novi Beograd) — 10 min from HTEC Group & Vega IT!',
      eligibilityNote: 'Accepts international exchange & internship students in New Belgrade',
      bookingUrl: 'https://scb.rs/',
      mapsQuery: 'Studentski+Grad+Tosin+bunar+Novi+Beograd',
    },
  ],
  'Novi Sad': [
    {
      id: 'dorm-ns-liman',
      name: 'Studentski dom "Slobodan Bajić" & "Nikola Tesla" (Liman Campus Novi Sad)',
      university: 'University of Novi Sad (Studentski Centar Novi Sad)',
      city: 'Novi Sad',
      country: 'Serbia',
      addressOrDistrict: 'Dr Sime Miloševića 10, Liman University Campus, Novi Sad',
      monthlyPriceEur: 100,
      monthlyPriceRangeText: '€85 – €125/mo (utilities & internet included)',
      depositEur: 100,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Walking distance (~8 min) to Vega IT HQ, Vivify Ideas & Faculty of Technical Sciences (FTN)',
      eligibilityNote: 'Official University of Novi Sad campus dormitories right in the IT quarter',
      bookingUrl: 'https://www.scns.rs/',
      mapsQuery: 'Studentski+centar+Novi+Sad+Dr+Sime+Milosevica',
    },
  ],

  // ================= SLOVENIA (SI — Group 2: €600/mo) =================
  'Ljubljana': [
    {
      id: 'dorm-lju-rozna',
      name: 'Študentski dom Ljubljana — Rožna dolina & Bežigrad Campus',
      university: 'University of Ljubljana (Študentski dom Ljubljana)',
      city: 'Ljubljana',
      country: 'Slovenia',
      addressOrDistrict: 'Svetčeva ulica 9 (Rožna dolina) / Kardeljeva ploščad, Ljubljana',
      monthlyPriceEur: 165,
      monthlyPriceRangeText: '€140 – €195/mo (utilities included + access to €3.50 Študentski boni meals)',
      depositEur: 170,
      utilitiesIncluded: true,
      proximityToTechHubs: '~10 min bike/bus to Povio, Agiledrop, Kaldi IT & Faculty of Computer Science (FRI)',
      eligibilityNote: 'Open to Erasmus+ & international university trainees; Slovenia also gives subsidized restaurant meals to students!',
      bookingUrl: 'https://www.stud-dom-lj.si/en/',
      mapsQuery: 'Studentski+dom+Ljubljana+Rozna+dolina',
    },
  ],

  // ================= SLOVAKIA (SK — Group 2: €600/mo) =================
  'Bratislava': [
    {
      id: 'dorm-bts-stu',
      name: 'Študentský domov Mladá Garda & Mlynská dolina (STU / Comenius University)',
      university: 'Slovak University of Technology (STU) & Comenius University',
      city: 'Bratislava',
      country: 'Slovakia',
      addressOrDistrict: 'Račianska 103 (Mladá Garda) / Staré Grunty 36 (Mlynská dolina), Bratislava',
      monthlyPriceEur: 135,
      monthlyPriceRangeText: '€115 – €160/mo (utilities & campus internet included)',
      depositEur: 140,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12–15 min tram/bus to GoodRequest, Vacuumlabs & WEZEO in central Bratislava',
      eligibilityNote: 'Accepts Erasmus+ & visiting EU university students via STU / UK accommodation portals',
      bookingUrl: 'https://www.stuba.sk/english/students/accommodation.html',
      mapsQuery: 'Studentsky+domov+Mlada+Garda+Racianska+103+Bratislava',
    },
  ],

  // ================= CZECHIA (CZ — Group 2: €600/mo) =================
  'Prague': [
    {
      id: 'dorm-prg-cvut',
      name: 'ČVUT (CTU) Dormitories — Sinkuleho, Dejvice & Podolí (SÚZ ČVUT Prague)',
      university: 'Czech Technical University in Prague (ČVUT)',
      city: 'Prague',
      country: 'Czechia',
      addressOrDistrict: 'Zikova 13 (Dejvice) / Na Lysině 12 (Podolí), Prague',
      monthlyPriceEur: 165,
      monthlyPriceRangeText: '€145 – €195/mo (3,700 – 4,900 CZK/mo, utilities included)',
      depositEur: 170,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Walking distance to Ackee (Karlín/Dejvice) & 12 min metro to STRV and OAK’S LAB!',
      eligibilityNote: 'SÚZ ČVUT Prague accommodates Erasmus+ & visiting international university students',
      bookingUrl: 'https://www.suz.cvut.cz/en/long-term-accommodation',
      mapsQuery: 'Sinkuleho+kolej+CVUT+Zikova+Prague',
    },
  ],
  'Brno': [
    {
      id: 'dorm-brq-vut',
      name: 'VUT Koleje Pod Palackého vrchem & Masaryk Univ. Vinařská Dorms',
      university: 'Brno University of Technology (VUT) & Masaryk University (MUNI)',
      city: 'Brno',
      country: 'Czechia',
      addressOrDistrict: 'Kolejní 2 (Královo Pole Tech Park) / Vinařská 5, Brno',
      monthlyPriceEur: 150,
      monthlyPriceRangeText: '€130 – €175/mo (3,300 – 4,400 CZK/mo, utilities included)',
      depositEur: 150,
      utilitiesIncluded: true,
      proximityToTechHubs: '~10 min tram to STRV Brno, Moravio & Brno Technological Park',
      eligibilityNote: 'Accepts Erasmus+ & visiting students via VUT KM / MUNI SKM accommodation offices',
      bookingUrl: 'https://www.kam.vutbr.cz/english/',
      mapsQuery: 'Koleje+Pod+Palackeho+vrchem+Kolejni+2+Brno',
    },
  ],

  // ================= NORWAY (NO — Group 1: €650/mo) =================
  'Oslo': [
    {
      id: 'dorm-osl-sio',
      name: 'SiO Student Housing — Kringsjå & Sogn Student Village (Oslo)',
      university: 'University of Oslo (UiO) & OsloMet Student Welfare Organization (SiO)',
      city: 'Oslo',
      country: 'Norway',
      addressOrDistrict: 'Olav M. Troviks vei (Kringsjå) / Rolf E. Stenersens allé (Sogn), Oslo',
      monthlyPriceEur: 445,
      monthlyPriceRangeText: '€395 – €510/mo (4,600 – 5,900 NOK/mo, electricity & internet included)',
      depositEur: 450,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Direct T-Bane (Metro Line 5) ~14 min to central Oslo (KodeWorks, Bleed & Sanity)',
      eligibilityNote: 'SiO provides 25+ student villages in Oslo; international students & trainees can apply online',
      bookingUrl: 'https://www.sio.no/en/housing',
      mapsQuery: 'Kringsja+Studentby+SiO+Oslo',
    },
  ],

  // ================= DENMARK (DK — Group 1: €650/mo) =================
  'Copenhagen': [
    {
      id: 'dorm-cph-kkik',
      name: 'KKIK Student Dormitories — Grønjordskollegiet & Øresundskollegiet (Copenhagen)',
      university: 'Copenhagen Student Dormitory Office (KKIK / University of Copenhagen & ITU)',
      city: 'Copenhagen',
      country: 'Denmark',
      addressOrDistrict: 'Grønjordsvej 10 (Amager, next to ITU) / Dalslandsgade 8, Copenhagen S',
      monthlyPriceEur: 450,
      monthlyPriceRangeText: '€390 – €520/mo (2,900 – 3,900 DKK/mo, utilities included)',
      depositEur: 450,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Next to IT University of Copenhagen (ITU) & ~10 min metro/bike to Signifly, Abtion & Monstarlab',
      eligibilityNote: 'KKIK (ungdomsboliger.dk) & Housing Foundation Copenhagen serve enrolled university students & interns',
      bookingUrl: 'https://www.kkik.dk/en',
      mapsQuery: 'Gronjordskollegiet+Copenhagen',
    },
  ],
};

export function getNearestDormsForCompany(companyName: string, cityName: string): UniversityDormOption[] {
  const normalizedCity = Object.keys(UNIVERSITY_DORMS_BY_CITY).find(
    (k) => k.toLowerCase() === (cityName || '').toLowerCase() || (cityName || '').toLowerCase().includes(k.toLowerCase())
  );
  if (normalizedCity && UNIVERSITY_DORMS_BY_CITY[normalizedCity]) {
    return UNIVERSITY_DORMS_BY_CITY[normalizedCity];
  }
  return UNIVERSITY_DORMS_BY_CITY['Kraków'];
}

export const CITY_LIVING_COSTS: Record<string, CityLivingCost> = {
  // POLAND (PL — Group 3: €550/mo)
  'Kraków': {
    city: 'Kraków',
    country: 'Poland',
    countryCode: 'PL',
    rent: 460,
    utilitiesInternet: 75,
    initialDeposit: 460,
    dormRent: 150,
    dormUtilitiesInternet: 0,
    dormDeposit: 150,
    dormNote: 'AGH Student Campus (Miasteczko Studenckie AGH) or Jagiellonian Univ. DS Piast (~600–750 PLN/mo, utilities included!)',
    foodGroceries: 230,
    publicTransport: 22,
    otherLiving: 90,
    travelFromPortugal: 170,
    typicalPaidStipendRange: '€1,100 – €1,500/mo (4,800–6,500 PLN if paid vacancy)',
    housingNote: 'Private student room in Zabłocie / Kazimierz (€460) OR AGH/UJ University Dormitory (€150/mo)',
    sources: 'AGH Student Campus Tariff 2026, UJ Dorms, Otodom Kraków, MPK Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },
  'Warsaw': {
    city: 'Warsaw',
    country: 'Poland',
    countryCode: 'PL',
    rent: 540,
    utilitiesInternet: 85,
    initialDeposit: 540,
    dormRent: 180,
    dormUtilitiesInternet: 0,
    dormDeposit: 185,
    dormNote: 'Politechnika Warszawska DS Riviera (Metro Politechnika) or Univ. of Warsaw Dorms (~700–900 PLN/mo, utilities included)',
    foodGroceries: 250,
    publicTransport: 26,
    otherLiving: 100,
    travelFromPortugal: 165,
    typicalPaidStipendRange: '€1,200 – €1,750/mo (5,200–7,500 PLN if paid vacancy)',
    housingNote: 'Shared flat room (€540) OR Warsaw Univ. of Technology DS Riviera Dormitory (€180/mo)',
    sources: 'Politechnika Warszawska & UW Dorm Rates 2026, Otodom Warsaw, ZTM Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },
  'Gdańsk': {
    city: 'Gdańsk',
    country: 'Poland',
    countryCode: 'PL',
    rent: 440,
    utilitiesInternet: 75,
    initialDeposit: 440,
    dormRent: 155,
    dormUtilitiesInternet: 0,
    dormDeposit: 160,
    dormNote: 'Gdańsk Univ. of Technology (Politechnika Gdańska DS 1–12 Wrzeszcz) or UG Oliwa Dorms (~620–780 PLN/mo)',
    foodGroceries: 225,
    publicTransport: 24,
    otherLiving: 85,
    travelFromPortugal: 185,
    typicalPaidStipendRange: '€1,050 – €1,450/mo (4,500–6,200 PLN if paid vacancy)',
    housingNote: 'Student room in Wrzeszcz (€440) OR Politechnika Gdańska Campus Dormitory (€155/mo)',
    sources: 'Politechnika Gdańska & UG Dorm Tariffs 2026, Trojmiasto.pl, ZTM Gdańsk (Checked Nov 2026)',
    isEstimate: true,
  },
  'Wrocław': {
    city: 'Wrocław',
    country: 'Poland',
    countryCode: 'PL',
    rent: 450,
    utilitiesInternet: 75,
    initialDeposit: 450,
    dormRent: 160,
    dormUtilitiesInternet: 0,
    dormDeposit: 160,
    dormNote: 'Politechnika Wrocławska Wittigowo Campus or UWr Kredka & Ołówek Dorms (~620–800 PLN/mo)',
    foodGroceries: 225,
    publicTransport: 22,
    otherLiving: 85,
    travelFromPortugal: 175,
    typicalPaidStipendRange: '€1,050 – €1,450/mo (4,500–6,200 PLN if paid vacancy)',
    housingNote: 'Private room (€450) OR PWr Wittigowo / UWr Grunwaldzki University Dormitory (€160/mo)',
    sources: 'PWr & UWr Student Dormitory Rates 2026, Otodom Wrocław, MPK Wrocław (Checked Nov 2026)',
    isEstimate: true,
  },
  'Poznań': {
    city: 'Poznań',
    country: 'Poland',
    countryCode: 'PL',
    rent: 420,
    utilitiesInternet: 70,
    initialDeposit: 420,
    dormRent: 145,
    dormUtilitiesInternet: 0,
    dormDeposit: 150,
    dormNote: 'Politechnika Poznańska Piotrowo Campus Dorms DS 1–6 (~560–750 PLN/mo, utilities included)',
    foodGroceries: 220,
    publicTransport: 21,
    otherLiving: 80,
    travelFromPortugal: 180,
    typicalPaidStipendRange: '€1,000 – €1,400/mo (4,300–6,000 PLN if paid vacancy)',
    housingNote: 'Shared flat (€420) OR Politechnika Poznańska Campus Dormitory (€145/mo)',
    sources: 'Politechnika Poznańska Dormitory Tariff 2026, Otodom Poznań, ZTM Poznań (Checked Nov 2026)',
    isEstimate: true,
  },

  // CROATIA (HR — Group 3: €550/mo)
  'Zagreb': {
    city: 'Zagreb',
    country: 'Croatia',
    countryCode: 'HR',
    rent: 430,
    utilitiesInternet: 70,
    initialDeposit: 430,
    dormRent: 120,
    dormUtilitiesInternet: 0,
    dormDeposit: 120,
    dormNote: 'SCZG Studentski dom Stjepan Radić or Cvjetno naselje (~€95–€145/mo incl. utilities)',
    foodGroceries: 230,
    publicTransport: 15,
    otherLiving: 85,
    travelFromPortugal: 185,
    typicalPaidStipendRange: '€750 – €1,100/mo (Croatian student contract)',
    housingNote: 'SCZG University Dormitory (~€120/mo) vs Private Room in Trešnjevka (~€430/mo)',
    sources: 'Studentski Centar u Zagrebu (SCZG), Njuškalo, ZET Zagreb (Checked Nov 2026)',
    isEstimate: true,
  },
  'Split': {
    city: 'Split',
    country: 'Croatia',
    countryCode: 'HR',
    rent: 410,
    utilitiesInternet: 65,
    initialDeposit: 410,
    dormRent: 130,
    dormUtilitiesInternet: 0,
    dormDeposit: 130,
    dormNote: 'Studentski dom Dr. Franjo Tuđman on Split3 University Campus (~€110–€150/mo incl. utilities)',
    foodGroceries: 225,
    publicTransport: 18,
    otherLiving: 80,
    travelFromPortugal: 195,
    typicalPaidStipendRange: '€700 – €1,000/mo (Croatian student rate)',
    housingNote: 'University of Split Campus Dormitory (~€130/mo) vs Private Room (~€410/mo)',
    sources: 'Studentski centar Split, Njuškalo Split, Promet Split (Checked Nov 2026)',
    isEstimate: true,
  },

  // HUNGARY (HU — Group 3: €550/mo)
  'Budapest': {
    city: 'Budapest',
    country: 'Hungary',
    countryCode: 'HU',
    rent: 420,
    utilitiesInternet: 70,
    initialDeposit: 420,
    dormRent: 135,
    dormUtilitiesInternet: 0,
    dormDeposit: 150,
    dormNote: 'BME Schönherz / ELTE Kőrösi Dormitory (~€115–€165/mo incl. utilities & gigabit fiber)',
    foodGroceries: 215,
    publicTransport: 10,
    otherLiving: 85,
    travelFromPortugal: 155,
    typicalPaidStipendRange: '€750 – €1,150/mo (Hungarian engineering intern rate)',
    housingNote: 'BME / ELTE University Dormitory (~€135/mo) vs Shared Flat Room (~€420/mo)',
    sources: 'BME & ELTE Dormitory Tariffs, Ingatlan.com Budapest, BKK Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },

  // ESTONIA (EE — Group 2: €600/mo)
  'Tallinn': {
    city: 'Tallinn',
    country: 'Estonia',
    countryCode: 'EE',
    rent: 460,
    utilitiesInternet: 85,
    initialDeposit: 460,
    dormRent: 165,
    dormUtilitiesInternet: 0,
    dormDeposit: 175,
    dormNote: 'TalTech Student Campus Dormitories (Akadeemia tee 5/7/11, ~€140–€195/mo incl. utilities)',
    foodGroceries: 245,
    publicTransport: 20,
    otherLiving: 95,
    travelFromPortugal: 210,
    typicalPaidStipendRange: '€900 – €1,400/mo (Estonian tech intern stipend)',
    housingNote: 'TalTech Student Campus Dorm (~€165/mo) vs Private Room (~€460/mo)',
    sources: 'TalTech Student Campus (Üliõpilasküla), KV.ee Tallinn, TLT (Checked Nov 2026)',
    isEstimate: true,
  },
  'Tartu': {
    city: 'Tartu',
    country: 'Estonia',
    countryCode: 'EE',
    rent: 390,
    utilitiesInternet: 75,
    initialDeposit: 390,
    dormRent: 160,
    dormUtilitiesInternet: 0,
    dormDeposit: 160,
    dormNote: 'Tartu Student Village (Raatuse 22 / Narva mnt 25, ~€135–€190/mo incl. utilities)',
    foodGroceries: 230,
    publicTransport: 15,
    otherLiving: 85,
    travelFromPortugal: 225,
    typicalPaidStipendRange: '€800 – €1,250/mo (Tartu software intern rate)',
    housingNote: 'Tartu Student Village Raatuse 22 (~€160/mo) vs Private Room (~€390/mo)',
    sources: 'Tartu Student Village (campus.ee), KV.ee Tartu (Checked Nov 2026)',
    isEstimate: true,
  },

  // BULGARIA (BG — Group 3: €550/mo)
  'Sofia': {
    city: 'Sofia',
    country: 'Bulgaria',
    countryCode: 'BG',
    rent: 360,
    utilitiesInternet: 65,
    initialDeposit: 360,
    dormRent: 95,
    dormUtilitiesInternet: 0,
    dormDeposit: 100,
    dormNote: 'Studentski Grad (TU Sofia / Sofia University Dormitories, ~€75–€120/mo incl. utilities)',
    foodGroceries: 195,
    publicTransport: 12,
    otherLiving: 75,
    travelFromPortugal: 175,
    typicalPaidStipendRange: '€700 – €1,100/mo (1,400–2,200 BGN Sofia tech intern stipend)',
    housingNote: 'Studentski Grad University Dorm (~€95/mo!) vs Private Room (~€360/mo)',
    sources: 'TU Sofia Studentski Grad Dorms, Imot.bg Sofia, Sofia Urban Mobility (Checked Nov 2026)',
    isEstimate: true,
  },

  // SERBIA (RS — Group 3: €550/mo)
  'Belgrade': {
    city: 'Belgrade',
    country: 'Serbia',
    countryCode: 'RS',
    rent: 380,
    utilitiesInternet: 65,
    initialDeposit: 380,
    dormRent: 110,
    dormUtilitiesInternet: 0,
    dormDeposit: 110,
    dormNote: 'Studentski Grad Novi Beograd (~€90–€135/mo incl. utilities, right near HTEC & Vega IT)',
    foodGroceries: 195,
    publicTransport: 12,
    otherLiving: 75,
    travelFromPortugal: 190,
    typicalPaidStipendRange: '€600 – €950/mo (Serbian IT intern stipend)',
    housingNote: 'Studentski Grad Novi Beograd Dorm (~€110/mo) vs Private Room (~€380/mo)',
    sources: 'Studentski Centar Beograd, Halo Oglasi, Belgrade Transit (Checked Nov 2026)',
    isEstimate: true,
  },
  'Novi Sad': {
    city: 'Novi Sad',
    country: 'Serbia',
    countryCode: 'RS',
    rent: 330,
    utilitiesInternet: 60,
    initialDeposit: 330,
    dormRent: 100,
    dormUtilitiesInternet: 0,
    dormDeposit: 100,
    dormNote: 'Studentski Centar Novi Sad Liman Campus Dorms (~€85–€125/mo, 8 min walk to Vega IT & Vivify Ideas)',
    foodGroceries: 185,
    publicTransport: 10,
    otherLiving: 70,
    travelFromPortugal: 195,
    typicalPaidStipendRange: '€550 – €900/mo (Novi Sad IT intern stipend)',
    housingNote: 'Liman University Campus Dorm (~€100/mo) vs Private Room (~€330/mo)',
    sources: 'Studentski Centar Novi Sad, 4zida, JGSP Novi Sad (Checked Nov 2026)',
    isEstimate: true,
  },

  // SLOVENIA (SI — Group 2: €600/mo)
  'Ljubljana': {
    city: 'Ljubljana',
    country: 'Slovenia',
    countryCode: 'SI',
    rent: 470,
    utilitiesInternet: 80,
    initialDeposit: 470,
    dormRent: 165,
    dormUtilitiesInternet: 0,
    dormDeposit: 170,
    dormNote: 'Študentski dom Ljubljana Rožna dolina (~€140–€195/mo incl. utilities + €3.50 Študentski boni meals)',
    foodGroceries: 240,
    publicTransport: 20,
    otherLiving: 90,
    travelFromPortugal: 190,
    typicalPaidStipendRange: '€850 – €1,250/mo (Slovenian študentsko delo tech rate)',
    housingNote: 'Študentski dom Ljubljana (~€165/mo) vs Private Room (~€470/mo)',
    sources: 'Študentski dom Ljubljana (stud-dom-lj.si), Nepremicnine.net, LPP (Checked Nov 2026)',
    isEstimate: true,
  },

  // SLOVAKIA (SK — Group 2: €600/mo)
  'Bratislava': {
    city: 'Bratislava',
    country: 'Slovakia',
    countryCode: 'SK',
    rent: 460,
    utilitiesInternet: 75,
    initialDeposit: 460,
    dormRent: 135,
    dormUtilitiesInternet: 0,
    dormDeposit: 140,
    dormNote: 'STU Mladá Garda & Mlynská dolina University Dormitories (~€115–€160/mo incl. utilities)',
    foodGroceries: 230,
    publicTransport: 18,
    otherLiving: 85,
    travelFromPortugal: 170,
    typicalPaidStipendRange: '€850 – €1,250/mo (Slovak student intern rate)',
    housingNote: 'STU / Comenius University Dorm (~€135/mo) vs Private Room (~€460/mo)',
    sources: 'STU & Comenius University Dorms, Nehnutelnosti.sk, IDS BK (Checked Nov 2026)',
    isEstimate: true,
  },

  // CZECHIA (CZ — Group 2: €600/mo)
  'Prague': {
    city: 'Prague',
    country: 'Czechia',
    countryCode: 'CZ',
    rent: 530,
    utilitiesInternet: 85,
    initialDeposit: 530,
    dormRent: 165,
    dormUtilitiesInternet: 0,
    dormDeposit: 170,
    dormNote: 'ČVUT (CTU) Sinkuleho / Podolí / Strahov Dorms (~€145–€195/mo incl. utilities, near Ackee & STRV)',
    foodGroceries: 245,
    publicTransport: 12,
    otherLiving: 95,
    travelFromPortugal: 160,
    typicalPaidStipendRange: '€950 – €1,400/mo (Czech DPP/DPČ student engineering rate)',
    housingNote: 'ČVUT Prague University Dorm (~€165/mo) vs Shared Flat Room (~€530/mo)',
    sources: 'SÚZ ČVUT Prague Dorms, Bezrealitky, PID Lítačka Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },
  'Brno': {
    city: 'Brno',
    country: 'Czechia',
    countryCode: 'CZ',
    rent: 430,
    utilitiesInternet: 75,
    initialDeposit: 430,
    dormRent: 150,
    dormUtilitiesInternet: 0,
    dormDeposit: 150,
    dormNote: 'VUT Koleje Pod Palackého vrchem & MUNI Vinařská Dorms (~€130–€175/mo incl. utilities)',
    foodGroceries: 225,
    publicTransport: 11,
    otherLiving: 85,
    travelFromPortugal: 175,
    typicalPaidStipendRange: '€850 – €1,250/mo (Brno tech intern rate)',
    housingNote: 'VUT / Masaryk University Dorm (~€150/mo) vs Private Room (~€430/mo)',
    sources: 'VUT & MUNI Brno Dorm Tariffs, Bezrealitky Brno, DPMB (Checked Nov 2026)',
    isEstimate: true,
  },

  // NORWAY (NO — Group 1: €650/mo)
  'Oslo': {
    city: 'Oslo',
    country: 'Norway',
    countryCode: 'NO',
    rent: 760,
    utilitiesInternet: 95,
    initialDeposit: 760,
    dormRent: 445,
    dormUtilitiesInternet: 0,
    dormDeposit: 450,
    dormNote: 'SiO Student Housing — Kringsjå & Sogn Student Village (~€395–€510/mo incl. electricity & fiber)',
    foodGroceries: 340,
    publicTransport: 48,
    otherLiving: 130,
    travelFromPortugal: 185,
    typicalPaidStipendRange: '€1,600 – €2,400/mo (if paid Norwegian tech internship)',
    housingNote: 'SiO Kringsjå / Sogn Student Village (~€445/mo) vs Private Room (~€760/mo)',
    sources: 'SiO (sio.no), Hybel.no Oslo, Ruter Student Pass (Checked Nov 2026)',
    isEstimate: true,
  },

  // DENMARK (DK — Group 1: €650/mo)
  'Copenhagen': {
    city: 'Copenhagen',
    country: 'Denmark',
    countryCode: 'DK',
    rent: 780,
    utilitiesInternet: 95,
    initialDeposit: 780,
    dormRent: 450,
    dormUtilitiesInternet: 0,
    dormDeposit: 450,
    dormNote: 'KKIK Student Dormitories — Grønjordskollegiet & Øresundskollegiet (~€390–€520/mo incl. utilities)',
    foodGroceries: 320,
    publicTransport: 55,
    otherLiving: 125,
    travelFromPortugal: 170,
    typicalPaidStipendRange: '€450 – €1,200/mo (Danish erkendtlighed / paid tech trainee)',
    housingNote: 'KKIK Kollegiet Student Dorm (~€450/mo) vs Private Room (~€780/mo)',
    sources: 'KKIK (kkik.dk), BoligPortal Copenhagen, DOT Ungdomskort (Checked Nov 2026)',
    isEstimate: true,
  },
};

export const POLISH_CITIES = ['Kraków', 'Warsaw', 'Gdańsk', 'Wrocław', 'Poznań'];
export const EUROPEAN_COMPARISON_CITIES = [
  'Zagreb',
  'Split',
  'Budapest',
  'Tallinn',
  'Tartu',
  'Sofia',
  'Belgrade',
  'Novi Sad',
  'Ljubljana',
  'Bratislava',
  'Prague',
  'Brno',
  'Oslo',
  'Copenhagen',
];
export const ALL_SUPPORTED_CITIES = [...POLISH_CITIES, ...EUROPEAN_COMPARISON_CITIES];

export function calculateCityFinancials(
  cityName: string,
  durationMonths: number = 5,
  confirmedEmployerCompMonthly: number = 0,
  housingMode: 'dorm' | 'private' = 'dorm'
) {
  const normalizedKey =
    Object.keys(CITY_LIVING_COSTS).find(
      (k) =>
        k.toLowerCase() === (cityName || '').toLowerCase() ||
        (cityName || '').toLowerCase().includes(k.toLowerCase())
    ) || 'Kraków';
  const city = CITY_LIVING_COSTS[normalizedKey] || CITY_LIVING_COSTS['Kraków'];
  const scholarshipConfig =
    IPCA_SCHOLARSHIP_CONFIG.countries[city.country] || IPCA_SCHOLARSHIP_CONFIG.countries.Poland;

  const isDorm = housingMode === 'dorm';
  const effectiveRent = isDorm ? city.dormRent : city.rent;
  const effectiveUtilities = isDorm ? city.dormUtilitiesInternet : city.utilitiesInternet;
  const effectiveDeposit = isDorm ? city.dormDeposit : city.initialDeposit;

  const monthlyExpenses =
    effectiveRent +
    effectiveUtilities +
    city.foodGroceries +
    city.publicTransport +
    city.otherLiving;

  const privateMonthlyExpenses =
    city.rent +
    city.utilitiesInternet +
    city.foodGroceries +
    city.publicTransport +
    city.otherLiving;

  const monthlyDormSavings = privateMonthlyExpenses - monthlyExpenses;

  const monthlyScholarship = scholarshipConfig.monthlyRateEur;
  const monthlySupportTotal = monthlyScholarship + confirmedEmployerCompMonthly;
  const monthlyGapOrSurplus = monthlySupportTotal - monthlyExpenses;

  const totalRecurring = monthlyExpenses * durationMonths;
  const totalOneOffWithDeposit = city.travelFromPortugal + effectiveDeposit;
  const totalExpensesNetDeposit = totalRecurring + city.travelFromPortugal;
  const totalExpensesGross = totalRecurring + totalOneOffWithDeposit;

  const totalScholarship = monthlyScholarship * durationMonths;
  const totalEmployerComp = confirmedEmployerCompMonthly * durationMonths;
  const totalFunding = totalScholarship + totalEmployerComp;

  const estimatedPersonalContribution = Math.max(0, totalExpensesNetDeposit - totalFunding);
  const dormOptions = UNIVERSITY_DORMS_BY_CITY[city.city] || [];

  return {
    city,
    housingMode,
    effectiveRent,
    effectiveUtilities,
    effectiveDeposit,
    monthlyDormSavings,
    totalDormSavingsForDuration: monthlyDormSavings * durationMonths,
    dormOptions,
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
