export interface UniversityDormOption {
  id: string;
  name: string;
  university: string;
  city: string;
  country: 'Poland' | 'Netherlands';
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
  country: 'Poland' | 'Netherlands';
  countryCode: 'PL' | 'NL';
  // Private room / shared flat (or budget apartment)
  rent: number;
  utilitiesInternet: number;
  initialDeposit: number;
  // University Student Dormitory / Campus Housing (Dom Studencki / DUWO / SSH / Xior)
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

export const UNIVERSITY_DORMS_BY_CITY: Record<string, UniversityDormOption[]> = {
  // ================= POLAND (PL) =================
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

  // ================= NETHERLANDS (NL) =================
  'Amsterdam': [
    {
      id: 'dorm-ams-duwo',
      name: 'DUWO University Student Housing (Science Park / Uilenstede Campus)',
      university: 'University of Amsterdam (UvA) & VU Amsterdam Partner (DUWO)',
      city: 'Amsterdam',
      country: 'Netherlands',
      addressOrDistrict: 'Uilenstede (Amstelveen) / Carolina MacGillavrylaan (Science Park), Amsterdam',
      monthlyPriceEur: 540,
      monthlyPriceRangeText: '€460 – €620/mo (incl. utilities & internet via DUWO / ROOM.nl)',
      depositEur: 500,
      utilitiesIncluded: true,
      proximityToTechHubs: '~15–20 min metro/bike to DEPT®, Framer, Guerrilla Games, GRRR & Q42',
      eligibilityNote: 'University-affiliated non-profit student housing; register early on ROOM.nl or DUWO Short Stay',
      bookingUrl: 'https://www.duwo.nl/en/',
      mapsQuery: 'Campus+Uilenstede+DUWO+Amsterdam',
    },
    {
      id: 'dorm-ams-studenthotel',
      name: 'Student Experience Amsterdam (Minervahaven / Zuidas / NDSM)',
      university: 'Amsterdam Student Residence Network',
      city: 'Amsterdam',
      country: 'Netherlands',
      addressOrDistrict: 'Moermanskkade / NDSM / Zuidas, Amsterdam',
      monthlyPriceEur: 640,
      monthlyPriceRangeText: '€580 – €720/mo (self-contained studio for enrolled EU students)',
      depositEur: 600,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12 min ferry/bike to Amsterdam Centraal, Framer, Guerrilla Games & DEPT®',
      eligibilityNote: 'Requires proof of enrollment at a university (IPCA student certificate accepted)',
      bookingUrl: 'https://studentexperience.com/en/locations/amsterdam',
      mapsQuery: 'Student+Experience+Amsterdam+Minervahaven',
    },
  ],
  'Rotterdam': [
    {
      id: 'dorm-rot-ssh',
      name: 'SSH Student Housing Rotterdam (Hatta Building — Woudestein Campus)',
      university: 'Erasmus University Rotterdam (EUR) Campus Housing',
      city: 'Rotterdam',
      country: 'Netherlands',
      addressOrDistrict: 'Burgemeester Oudlaan 50 (Campus Woudestein), Kralingen, Rotterdam',
      monthlyPriceEur: 495,
      monthlyPriceRangeText: '€430 – €560/mo (utilities & high-speed internet included)',
      depositEur: 500,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12 min by metro/bike to DPDK, Fabrique, Hoppinger & Vertigo Games in central Rotterdam',
      eligibilityNote: 'Official student residence on Erasmus University campus via SSH Short Stay / Stadswonen',
      bookingUrl: 'https://www.sshxl.nl/en/cities/rotterdam',
      mapsQuery: 'Hatta+Building+SSH+Erasmus+University+Rotterdam',
    },
    {
      id: 'dorm-rot-xior',
      name: 'Xior Student Housing Rotterdam (Willem Ruyslaan / Struisenburg)',
      university: 'Rotterdam University Student Residence',
      city: 'Rotterdam',
      country: 'Netherlands',
      addressOrDistrict: 'Willem Ruyslaan 225, Kralingen, Rotterdam',
      monthlyPriceEur: 530,
      monthlyPriceRangeText: '€480 – €590/mo (enrolled university student rooms)',
      depositEur: 500,
      utilitiesIncluded: true,
      proximityToTechHubs: '10 min bike ride to Rotterdam Centraal & Schieblock digital agencies',
      eligibilityNote: 'Open to international university students & interns with proof of university enrollment',
      bookingUrl: 'https://www.xior.nl/en/city/rotterdam',
      mapsQuery: 'Xior+Student+Housing+Willem+Ruyslaan+Rotterdam',
    },
  ],
  'Utrecht': [
    {
      id: 'dorm-utr-ssh',
      name: 'SSH Student Housing Utrecht (Utrecht Science Park — Johanna / Cambridgelaan)',
      university: 'Utrecht University (UU) & HU Campus Housing',
      city: 'Utrecht',
      country: 'Netherlands',
      addressOrDistrict: 'Cambridgelaan / Bisschopssteeg (Science Park De Uithof), Utrecht',
      monthlyPriceEur: 490,
      monthlyPriceRangeText: '€420 – €560/mo (utilities & internet included)',
      depositEur: 500,
      utilitiesIncluded: true,
      proximityToTechHubs: '~12 min tram (Uithoflijn) or bike to CLEVER°FRANKE & Nixxes Software (Utrecht Central)',
      eligibilityNote: 'Managed by SSH Student Housing for international & local students in Utrecht',
      bookingUrl: 'https://www.sshxl.nl/en/cities/utrecht',
      mapsQuery: 'SSH+Cambridgelaan+Utrecht+Science+Park',
    },
  ],
  'Eindhoven': [
    {
      id: 'dorm-ein-vestide',
      name: 'TU/e Campus Student Towers — Aurora & Luna (Vestide Student Housing)',
      university: 'Eindhoven University of Technology (TU/e)',
      city: 'Eindhoven',
      country: 'Netherlands',
      addressOrDistrict: 'De Lampendriessen 31 (TU/e Science Park Campus), Eindhoven',
      monthlyPriceEur: 460,
      monthlyPriceRangeText: '€395 – €530/mo (utilities included via Vestide)',
      depositEur: 450,
      utilitiesIncluded: true,
      proximityToTechHubs: 'Right in central Eindhoven (5 min walk to Eindhoven Centraal & Brainport tech agencies)',
      eligibilityNote: 'Vestide prioritizes students & interns studying or completing a university internship in Eindhoven!',
      bookingUrl: 'https://www.vestide.nl/en/',
      mapsQuery: 'Luna+Building+TU+e+Campus+Eindhoven',
    },
  ],
  'The Hague': [
    {
      id: 'dorm-hag-duwo',
      name: 'DUWO Student Housing Den Haag (Stamkartplein / Waldorpstraat near HS Station)',
      university: 'The Hague University of Applied Sciences (THUAS) & Leiden Campus',
      city: 'The Hague',
      country: 'Netherlands',
      addressOrDistrict: 'Stamkartplein / Waldorpstraat (next to Den Haag HS Station), The Hague',
      monthlyPriceEur: 485,
      monthlyPriceRangeText: '€425 – €550/mo (incl. utilities & internet)',
      depositEur: 480,
      utilitiesIncluded: true,
      proximityToTechHubs: '~8 min bike/tram to Q42 The Hague office (Binckhorst / Saturnusstraat)',
      eligibilityNote: 'Non-profit university student dorms right next to The Hague University campus',
      bookingUrl: 'https://www.duwo.nl/en/',
      mapsQuery: 'DUWO+Stamkartplein+Den+Haag',
    },
  ],
  'Groningen': [
    {
      id: 'dorm-gro-ssh',
      name: 'SSH Student Housing Groningen (Upsilon / Frascati / Paddepoel)',
      university: 'University of Groningen (RUG) & Hanze UAS',
      city: 'Groningen',
      country: 'Netherlands',
      addressOrDistrict: 'Zernikeplein / Paddepoel / Frascati (near Station), Groningen',
      monthlyPriceEur: 435,
      monthlyPriceRangeText: '€380 – €495/mo (utilities & internet included)',
      depositEur: 450,
      utilitiesIncluded: true,
      proximityToTechHubs: '~8 min bike to Gomibo / Belsimpel HQ (Grote Markt) & Groningen tech hub',
      eligibilityNote: 'SSH Groningen & Sugar Homes offer furnished semester student rooms',
      bookingUrl: 'https://www.sshxl.nl/en/cities/groningen',
      mapsQuery: 'SSH+Upsilon+Groningen',
    },
  ],
  'Delft': [
    {
      id: 'dorm-del-duwo',
      name: 'DUWO TU Delft Campus Housing (Prof. Schermerhornstraat / Roland Holstlaan)',
      university: 'Delft University of Technology (TU Delft)',
      city: 'Delft',
      country: 'Netherlands',
      addressOrDistrict: 'Prof. Schermerhornstraat / Mekelweg (TU Delft Campus), Delft',
      monthlyPriceEur: 465,
      monthlyPriceRangeText: '€410 – €530/mo (utilities & campus fiber included)',
      depositEur: 460,
      utilitiesIncluded: true,
      proximityToTechHubs: '~5 min bike to Fabrique Delft & 12 min train to Rotterdam/The Hague agencies',
      eligibilityNote: 'Managed by DUWO for TU Delft & visiting international students',
      bookingUrl: 'https://www.duwo.nl/en/',
      mapsQuery: 'DUWO+Prof+Schermerhornstraat+Delft',
    },
  ],
  'Leiden': [
    {
      id: 'dorm-lei-duwo',
      name: 'DUWO Leiden Bio Science Park & Pelikaanhof Student Residences',
      university: 'Leiden University',
      city: 'Leiden',
      country: 'Netherlands',
      addressOrDistrict: 'Wassenaarseweg / Pelikaanhof, Leiden',
      monthlyPriceEur: 475,
      monthlyPriceRangeText: '€415 – €540/mo (utilities included)',
      depositEur: 475,
      utilitiesIncluded: true,
      proximityToTechHubs: '~5 min to Leiden Central Station & Leiden Bio Science Park software companies',
      eligibilityNote: 'DUWO / ROOM.nl student housing for Leiden University & visiting interns',
      bookingUrl: 'https://www.duwo.nl/en/',
      mapsQuery: 'DUWO+Pelikaanhof+Leiden',
    },
  ],
  'Arnhem': [
    {
      id: 'dorm-arn-ssh',
      name: 'SSH & Vrijburcht Student Housing (Presikhaaf — HAN Campus Arnhem)',
      university: 'HAN University of Applied Sciences & ArtEZ Arnhem',
      city: 'Arnhem',
      country: 'Netherlands',
      addressOrDistrict: 'Ruitenberglaan (HAN Campus Presikhaaf), Arnhem',
      monthlyPriceEur: 425,
      monthlyPriceRangeText: '€375 – €480/mo (utilities included)',
      depositEur: 425,
      utilitiesIncluded: true,
      proximityToTechHubs: '~10 min bike/train to Arnhem Central & eastern Netherlands digital hubs',
      eligibilityNote: 'Managed via SSH & Klik voor Kamers for students & interns in Arnhem/Nijmegen',
      bookingUrl: 'https://www.sshxl.nl/en',
      mapsQuery: 'HAN+Campus+Ruitenberglaan+Arnhem',
    },
  ],
  'Breda': [
    {
      id: 'dorm-bre-klik',
      name: 'Klik voor Kamers & Xior Student Residence Breda (near BUas Game Campus)',
      university: 'Breda University of Applied Sciences (BUas) & Avans',
      city: 'Breda',
      country: 'Netherlands',
      addressOrDistrict: 'Mgr. Hopmansstraat / Claudius Prinsenlaan, Breda',
      monthlyPriceEur: 440,
      monthlyPriceRangeText: '€390 – €500/mo (incl. utilities)',
      depositEur: 440,
      utilitiesIncluded: true,
      proximityToTechHubs: '~6 min bike to CM.com HQ (Konijnenberg) & BUas International Game Architecture campus',
      eligibilityNote: 'Official non-profit student housing platform for Breda (Klik voor Kamers / Xior)',
      bookingUrl: 'https://www.klikvoorkamers.nl/en/',
      mapsQuery: 'Breda+University+of+Applied+Sciences+Student+Housing',
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
  // POLAND (PL)
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
    sources: 'AGH Student Campus Tariff 2026, UJ Dorms, Otodom Kraków, MPK Student Pass (Checked Oct 2026)',
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
    sources: 'Politechnika Warszawska & UW Dorm Rates 2026, Otodom Warsaw, ZTM Student Pass (Checked Oct 2026)',
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
    sources: 'Politechnika Gdańska & UG Dorm Tariffs 2026, Trojmiasto.pl, ZTM Gdańsk (Checked Oct 2026)',
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
    sources: 'PWr & UWr Student Dormitory Rates 2026, Otodom Wrocław, MPK Wrocław (Checked Oct 2026)',
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
    sources: 'Politechnika Poznańska Dormitory Tariff 2026, Otodom Poznań, ZTM Poznań (Checked Oct 2026)',
    isEstimate: true,
  },

  // NETHERLANDS (NL)
  'Amsterdam': {
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 980,
    utilitiesInternet: 115,
    initialDeposit: 980,
    dormRent: 560,
    dormUtilitiesInternet: 0,
    dormDeposit: 500,
    dormNote: 'DUWO University Student Housing (Uilenstede / Science Park) or Student Experience (€460–€640/mo incl. utilities)',
    foodGroceries: 310,
    publicTransport: 95,
    otherLiving: 130,
    travelFromPortugal: 160,
    typicalPaidStipendRange: '€500 – €850/mo (Standard Dutch stagevergoeding)',
    housingNote: 'DUWO / ROOM.nl University Dormitory (~€560/mo) vs Private Room / Airbnb (~€980/mo)',
    sources: 'DUWO / ROOM.nl Tariff 2026, HousingAnywhere Q3 2026, GVB / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Rotterdam': {
    city: 'Rotterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 790,
    utilitiesInternet: 105,
    initialDeposit: 790,
    dormRent: 495,
    dormUtilitiesInternet: 0,
    dormDeposit: 500,
    dormNote: 'SSH Erasmus University Campus (Hatta Building) or Xior Student Housing (€430–€560/mo incl. utilities)',
    foodGroceries: 290,
    publicTransport: 85,
    otherLiving: 115,
    travelFromPortugal: 165,
    typicalPaidStipendRange: '€450 – €750/mo (Dutch stagevergoeding)',
    housingNote: 'SSH Erasmus University Dorm (~€495/mo) vs Private Apartment Room (~€790/mo)',
    sources: 'SSH Student Housing Rotterdam 2026, Xior, Kamernet, RET Transit (Checked Oct 2026)',
    isEstimate: true,
  },
  'Utrecht': {
    city: 'Utrecht',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 830,
    utilitiesInternet: 110,
    initialDeposit: 830,
    dormRent: 490,
    dormUtilitiesInternet: 0,
    dormDeposit: 500,
    dormNote: 'SSH Utrecht Science Park (Cambridgelaan / Johanna Building, €420–€560/mo incl. utilities)',
    foodGroceries: 295,
    publicTransport: 80,
    otherLiving: 120,
    travelFromPortugal: 165,
    typicalPaidStipendRange: '€450 – €750/mo (Dutch stagevergoeding)',
    housingNote: 'SSH Science Park University Dorm (~€490/mo) vs Private Room (~€830/mo)',
    sources: 'SSH Student Housing Utrecht 2026, Kamernet, U-OV / Swapfiets (Checked Oct 2026)',
    isEstimate: true,
  },
  'Eindhoven': {
    city: 'Eindhoven',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 690,
    utilitiesInternet: 100,
    initialDeposit: 690,
    dormRent: 460,
    dormUtilitiesInternet: 0,
    dormDeposit: 450,
    dormNote: 'Vestide TU/e Campus Towers (Aurora & Luna — prioritizes Eindhoven students & interns! ~€395–€530/mo)',
    foodGroceries: 275,
    publicTransport: 65,
    otherLiving: 105,
    travelFromPortugal: 145,
    typicalPaidStipendRange: '€450 – €750/mo (Brainport Tech & Agency stagevergoeding)',
    housingNote: 'Vestide TU/e Campus Dorm (~€460/mo) vs Private Room (~€690/mo); direct flights from Porto/Lisbon',
    sources: 'Vestide Student Housing TU/e 2026, Kamernet Eindhoven, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'The Hague': {
    city: 'The Hague',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 770,
    utilitiesInternet: 105,
    initialDeposit: 770,
    dormRent: 485,
    dormUtilitiesInternet: 0,
    dormDeposit: 480,
    dormNote: 'DUWO Student Housing near The Hague University (THUAS / HS Station, ~€425–€550/mo incl. utilities)',
    foodGroceries: 285,
    publicTransport: 80,
    otherLiving: 115,
    travelFromPortugal: 165,
    typicalPaidStipendRange: '€450 – €700/mo (Dutch stagevergoeding)',
    housingNote: 'DUWO THUAS Campus Dorm (~€485/mo) vs Private Room (~€770/mo)',
    sources: 'DUWO Den Haag 2026, Kamernet, HTM / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Groningen': {
    city: 'Groningen',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 610,
    utilitiesInternet: 95,
    initialDeposit: 610,
    dormRent: 435,
    dormUtilitiesInternet: 0,
    dormDeposit: 450,
    dormNote: 'SSH Groningen Student Residences (Upsilon / Frascati / Paddepoel, ~€380–€495/mo incl. utilities)',
    foodGroceries: 260,
    publicTransport: 55,
    otherLiving: 95,
    travelFromPortugal: 190,
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: 'SSH Groningen University Residence (~€435/mo) vs Private Room (~€610/mo)',
    sources: 'SSH Groningen 2026, Kamernet, Qbuzz / NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Delft': {
    city: 'Delft',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 710,
    utilitiesInternet: 100,
    initialDeposit: 710,
    dormRent: 465,
    dormUtilitiesInternet: 0,
    dormDeposit: 460,
    dormNote: 'DUWO TU Delft Campus Housing (Prof. Schermerhornstraat / Mekelweg, ~€410–€530/mo incl. utilities)',
    foodGroceries: 275,
    publicTransport: 65,
    otherLiving: 105,
    travelFromPortugal: 165,
    typicalPaidStipendRange: '€450 – €700/mo (Dutch stagevergoeding)',
    housingNote: 'DUWO TU Delft Campus Dorm (~€465/mo) vs Private Room (~€710/mo)',
    sources: 'DUWO Delft 2026, Kamernet, NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Leiden': {
    city: 'Leiden',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 730,
    utilitiesInternet: 100,
    initialDeposit: 730,
    dormRent: 475,
    dormUtilitiesInternet: 0,
    dormDeposit: 475,
    dormNote: 'DUWO Leiden Bio Science Park & Pelikaanhof Student Residences (~€415–€540/mo incl. utilities)',
    foodGroceries: 280,
    publicTransport: 65,
    otherLiving: 105,
    travelFromPortugal: 160,
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: 'DUWO Leiden University Dorm (~€475/mo) vs Private Room (~€730/mo)',
    sources: 'DUWO Leiden 2026, Kamernet, NS, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Arnhem': {
    city: 'Arnhem',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 600,
    utilitiesInternet: 95,
    initialDeposit: 600,
    dormRent: 425,
    dormUtilitiesInternet: 0,
    dormDeposit: 425,
    dormNote: 'HAN Campus Presikhaaf Student Housing via SSH / Klik voor Kamers (~€375–€480/mo incl. utilities)',
    foodGroceries: 260,
    publicTransport: 60,
    otherLiving: 95,
    travelFromPortugal: 180,
    typicalPaidStipendRange: '€400 – €600/mo (Dutch stagevergoeding)',
    housingNote: 'HAN Campus Student Residence (~€425/mo) vs Private Room (~€600/mo)',
    sources: 'SSH / Klik voor Kamers Arnhem 2026, Kamernet, Nibud (Checked Oct 2026)',
    isEstimate: true,
  },
  'Breda': {
    city: 'Breda',
    country: 'Netherlands',
    countryCode: 'NL',
    rent: 620,
    utilitiesInternet: 95,
    initialDeposit: 620,
    dormRent: 440,
    dormUtilitiesInternet: 0,
    dormDeposit: 440,
    dormNote: 'Klik voor Kamers & Xior Student Housing near BUas Game Campus (~€390–€500/mo incl. utilities)',
    foodGroceries: 265,
    publicTransport: 60,
    otherLiving: 95,
    travelFromPortugal: 160,
    typicalPaidStipendRange: '€400 – €650/mo (Dutch stagevergoeding)',
    housingNote: 'BUas Student Residence (~€440/mo) vs Private Room (~€620/mo)',
    sources: 'Klik voor Kamers / Xior Breda 2026, Kamernet, Nibud (Checked Oct 2026)',
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
  confirmedEmployerCompMonthly: number = 0,
  housingMode: 'dorm' | 'private' = 'dorm'
) {
  const city = CITY_LIVING_COSTS[cityName] || CITY_LIVING_COSTS['Kraków'];
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
