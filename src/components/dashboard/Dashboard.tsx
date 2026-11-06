import React, { useState } from 'react';
import { useApp, SupportedCountryFilter } from '../../context/AppContext';
import {
  IPCA_SCHOLARSHIP_CONFIG,
  POLISH_CITIES,
  SUPPORTED_COUNTRIES_LIST,
  calculateCityFinancials,
  getCountryMeta,
} from '../../data/financialComparisonData';
import {
  Building2,
  Compass,
  Calendar,
  Send,
  MailCheck,
  MessageSquare,
  Users,
  MapPin,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Wallet,
  AlertCircle,
  Info,
  GraduationCap,
  Home,
  ExternalLink,
  Clock,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { metrics, setActiveTab, setSelectedCompanyId, selectedCountry, setSelectedCountry, openExternal } = useApp();

  // Interactive Financial Comparison Calculator State
  const [plCity, setPlCity] = useState<string>('Kraków');
  const [compareCity, setCompareCity] = useState<string>('Zagreb');
  const [durationMonths, setDurationMonths] = useState<number>(5);
  const [housingMode, setHousingMode] = useState<'dorm' | 'private'>('dorm');
  const [plEmployerComp, setPlEmployerComp] = useState<number>(0);
  const [compareEmployerComp, setCompareEmployerComp] = useState<number>(0);
  const [groupHubFilter, setGroupHubFilter] = useState<'ALL' | 'G1' | 'G2' | 'G3'>('ALL');

  const plPlan = calculateCityFinancials(plCity, durationMonths, plEmployerComp, housingMode);
  const comparePlan = calculateCityFinancials(compareCity, durationMonths, compareEmployerComp, housingMode);

  const kpis = [
    {
      title: 'Companies Discovered',
      value: metrics?.totalCompanies || 0,
      sub: `${metrics?.worthContacting || 0} worth contacting (11 Countries)`,
      icon: Building2,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    },
    {
      title: 'Internship Opportunities',
      value: metrics?.totalOpportunities || 0,
      sub: `${metrics?.dateMatches || 0} match Spring 2027`,
      icon: Compass,
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    },
    {
      title: 'Date-Compatible (2027)',
      value: metrics?.dateMatches || 0,
      sub: 'Feb–Jun/Jul 2027 window',
      icon: Calendar,
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    },
    {
      title: 'Emails Sent',
      value: metrics?.sentCount || 0,
      sub: `${metrics?.draftsCount || 0} drafts prepared`,
      icon: Send,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      title: 'Replies Received',
      value: metrics?.repliesCount || 0,
      sub: `${metrics?.awaitingResponse || 0} awaiting reply`,
      icon: MessageSquare,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'Interviews Scheduled',
      value: metrics?.interviewsCount || 0,
      sub: 'Target Deadline: 30 Nov 2026',
      icon: Users,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
  ];

  const countryHubs = [
    { city: 'Kraków & Warsaw', country: 'Poland', code: 'PL', group: 'G3', percentage: 92, tag: 'Group 3 (€550/mo) • Dorms ~€150/mo' },
    { city: 'Zagreb & Split', country: 'Croatia', code: 'HR', group: 'G3', percentage: 85, tag: 'Group 3 (€550/mo) • Infinum, Q, Cinnamon' },
    { city: 'Prague & Brno', country: 'Czechia', code: 'CZ', group: 'G2', percentage: 88, tag: 'Group 2 (€600/mo) • STRV, Ackee, OAK’S LAB' },
    { city: 'Copenhagen', country: 'Denmark', code: 'DK', group: 'G1', percentage: 80, tag: 'Group 1 (€650/mo) • Signifly, Abtion' },
    { city: 'Tallinn & Tartu', country: 'Estonia', code: 'EE', group: 'G2', percentage: 82, tag: 'Group 2 (€600/mo) • Helmes, Bitweb, Mooncascade' },
    { city: 'Ljubljana', country: 'Slovenia', code: 'SI', group: 'G2', percentage: 80, tag: 'Group 2 (€600/mo) • Povio, Agiledrop, Kaldi' },
    { city: 'Bratislava', country: 'Slovakia', code: 'SK', group: 'G2', percentage: 78, tag: 'Group 2 (€600/mo) • GoodRequest, Vacuumlabs' },
    { city: 'Budapest', country: 'Hungary', code: 'HU', group: 'G3', percentage: 78, tag: 'Group 3 (€550/mo) • UX studio, Supercharge' },
    { city: 'Sofia', country: 'Bulgaria', code: 'BG', group: 'G3', percentage: 76, tag: 'Group 3 (€550/mo) • MentorMate, Despark' },
    { city: 'Novi Sad & Belgrade', country: 'Serbia', code: 'RS', group: 'G3', percentage: 76, tag: 'Group 3 (€550/mo) • Vega IT, HTEC, Vivify' },
    { city: 'Oslo', country: 'Norway', code: 'NO', group: 'G1', percentage: 72, tag: 'Group 1 (€650/mo) • KodeWorks, Bleed, Sanity' },
  ].filter((h) => (groupHubFilter === 'ALL' ? true : h.group === groupHubFilter));

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Hero Action Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-purple-950/40 border border-indigo-500/20 p-6 shadow-xl space-y-4">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>IPCA Curricular Internship 2027 • 11 Supported European Countries</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Placement Goal: Secure by 30 November 2026</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Poland + 10 European Countries Web, UI/UX & Software House Pipeline
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Targeting English-speaking SME software houses, digital product agencies, and studios across{' '}
              <strong className="text-amber-300">Group 1 (€650/mo: Norway, Denmark)</strong>,{' '}
              <strong className="text-cyan-300">Group 2 (€600/mo: Estonia, Slovenia, Slovakia, Czechia)</strong>, and{' '}
              <strong className="text-indigo-200">Group 3 (€550/mo: Poland, Croatia, Hungary, Bulgaria, Serbia)</strong>{' '}
              for a 4–5 month placement (February/March – June/July 2027).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedCountry('All');
                setActiveTab('discovery');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All ({selectedCountry})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition"
            >
              <MailCheck className="w-4 h-4 text-purple-400" />
              <span>Draft Outreach</span>
            </button>
          </div>
        </div>

        {/* 1-Click Country Filter Pills across all 11 supported countries */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Filter by Country:</span>
          <button
            onClick={() => {
              setSelectedCountry('All');
              setActiveTab('discovery');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
              selectedCountry === 'All'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            All 11 Countries
          </button>
          {SUPPORTED_COUNTRIES_LIST.map((c) => (
            <button
              key={c.countryCode}
              onClick={() => {
                setSelectedCountry(c.country as SupportedCountryFilter);
                setActiveTab('discovery');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                selectedCountry === c.country
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : `${c.badgeColor} hover:brightness-125`
              }`}
              title={`${c.country} (${c.group} — €${c.monthlyRateEur}/month)`}
            >
              {c.countryCode} • {c.country} (€{c.monthlyRateEur})
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl bg-gradient-to-br ${kpi.color} bg-slate-900/60 border backdrop-blur-sm transition-all hover:scale-[1.02] shadow-sm space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">{kpi.title}</span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
              <div className="text-[10px] text-slate-400 font-medium truncate">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Pipeline Stages */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Application Pipeline Progress (11 Supported European Countries)
              </h3>
              <p className="text-xs text-slate-400">Current status distribution across companies and positions</p>
            </div>
            <button
              onClick={() => setActiveTab('tracker')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Open CRM</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { stage: 'Discovered', count: metrics?.totalCompanies || 0, color: 'text-slate-300', bg: 'bg-slate-800' },
              { stage: 'Draft Prepared', count: metrics?.draftsCount || 0, color: 'text-indigo-400', bg: 'bg-indigo-950/60 border border-indigo-800/40' },
              { stage: 'Email Sent', count: metrics?.sentCount || 0, color: 'text-blue-400', bg: 'bg-blue-950/60 border border-blue-800/40' },
              { stage: 'Follow-Up Due', count: metrics?.upcomingFollowUps || 0, color: 'text-amber-400', bg: 'bg-amber-950/60 border border-amber-800/40' },
              { stage: 'Replied', count: metrics?.repliesCount || 0, color: 'text-cyan-400', bg: 'bg-cyan-950/60 border border-cyan-800/40' },
              { stage: 'Interview', count: metrics?.interviewsCount || 0, color: 'text-emerald-400', bg: 'bg-emerald-950/60 border border-emerald-800/40' },
              { stage: 'Rejections', count: metrics?.rejectionsCount || 0, color: 'text-rose-400', bg: 'bg-rose-950/60 border border-rose-800/40' },
              { stage: 'Spring 2027 Matches', count: metrics?.dateMatches || 0, color: 'text-purple-400', bg: 'bg-purple-950/60 border border-purple-800/40' },
            ].map((st, i) => (
              <div key={i} className={`p-3 rounded-xl ${st.bg} space-y-1`}>
                <span className="text-[11px] font-medium text-slate-400 block">{st.stage}</span>
                <span className={`text-xl font-bold ${st.color}`}>{st.count}</span>
              </div>
            ))}
          </div>

          {/* IPCA Scholarship Rate Summary Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span>IPCA Group 1</span>
                <span className="font-mono text-sm">€650 / mo</span>
              </div>
              <p className="text-[11px] text-slate-300">Norway (NO), Denmark (DK)</p>
              <p className="text-[10px] text-slate-400">5-Month Grant: €3,250</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                <span>IPCA Group 2</span>
                <span className="font-mono text-sm">€600 / mo</span>
              </div>
              <p className="text-[11px] text-slate-300">Estonia (EE), Slovenia (SI), Slovakia (SK), Czechia (CZ)</p>
              <p className="text-[10px] text-slate-400">5-Month Grant: €3,000</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                <span>IPCA Group 3</span>
                <span className="font-mono text-sm">€550 / mo</span>
              </div>
              <p className="text-[11px] text-slate-300">Croatia (HR), Hungary (HU), Bulgaria (BG), Serbia (RS), Poland (PL)</p>
              <p className="text-[10px] text-slate-400">5-Month Grant: €2,750</p>
            </div>
          </div>

          {/* Safety & Responsible Automation Guarantee Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-200">Responsible Automation Safeguards Active</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Manual approval required for all outgoing drafts. Daily send limit enforced (max 20 emails/day). Duplicate contact prevention, English-by-default outreach, and verified versus speculative labeling active across all 11 countries.
              </p>
            </div>
          </div>
        </div>

        {/* Target Hubs across 11 Countries */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                Target Hubs (11 Countries)
              </h3>
              <p className="text-xs text-slate-400">By IPCA Scholarship Group</p>
            </div>
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-[10px] font-bold">
              {(['ALL', 'G1', 'G2', 'G3'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setGroupHubFilter(tab)}
                  className={`px-2 py-0.5 rounded transition ${
                    groupHubFilter === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-1 max-h-72 overflow-y-auto pr-1">
            {countryHubs.map((loc, i) => {
              const meta = getCountryMeta(loc.country);
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedCountry(loc.country as SupportedCountryFilter);
                    setActiveTab('discovery');
                  }}
                  className="space-y-1 cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-200 group-hover:text-indigo-300 transition">
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${meta.badgeColor}`}>
                        {loc.code}
                      </span>
                      <span>{loc.city}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate max-w-[175px]">{loc.tag}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        loc.group === 'G1'
                          ? 'bg-gradient-to-r from-amber-500 to-rose-400'
                          : loc.group === 'G2'
                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                      style={{ width: `${loc.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 text-purple-300 text-[11px] leading-relaxed">
            💡 <strong>11-Country Strategy:</strong> Group 2 (`EE, SI, SK, CZ` — €600/mo) and Group 3 (`PL, HR, HU, BG, RS` — €550/mo) have university dormitories at <strong>€95–€165/mo</strong>, making it possible to cover nearly 100% of your living expenses from the IPCA grant alone!
          </div>
        </div>
      </div>

      {/* IPCA Scholarship & Financial Comparison Calculator (Poland vs. Any Supported Country) */}
      <div className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                IPCA Scholarship & Living Cost Comparison Across All 11 Countries
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Source: {IPCA_SCHOLARSHIP_CONFIG.sourceLabel}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Requires IPCA Confirmation (2026/2027)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Compare <strong>Group 1 (€650/mo: NO, DK)</strong>, <strong>Group 2 (€600/mo: EE, SI, SK, CZ)</strong>, and{' '}
              <strong>Group 3 (€550/mo: HR, HU, BG, RS, PL)</strong> with university dormitories vs. private rooms for an ~{durationMonths}-month placement.
            </p>
          </div>

          {/* Housing Mode & Duration Selector */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setHousingMode('dorm')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  housingMode === 'dorm'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>🎓 University Dorm (Cheapest)</span>
              </button>
              <button
                onClick={() => setHousingMode('private')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  housingMode === 'private'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>🏠 Private Room / Airbnb</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Duration:</span>
              {[4, 5].map((m) => (
                <button
                  key={m}
                  onClick={() => setDurationMonths(m)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                    durationMonths === m
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {m} Mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT COLUMN: POLAND (PL) */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-indigo-500/30 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  PL • Poland
                </span>
                <select
                  value={plCity}
                  onChange={(e) => setPlCity(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                >
                  {POLISH_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}, Poland (Group 3 — €550/mo)
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">
                  IPCA {plPlan.scholarshipGroup} Scholarship
                </span>
                <span className="text-sm font-black text-emerald-400">
                  €{plPlan.monthlyScholarship}/mo (€{plPlan.totalScholarship} / {durationMonths} mo)
                </span>
              </div>
            </div>

            {/* Employer Stipend Input */}
            <div className="flex items-center justify-between bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-300 font-semibold block">Confirmed Employer Compensation (€/mo):</span>
                <span className="text-[10px] text-slate-500">{plPlan.city.typicalPaidStipendRange}</span>
              </div>
              <input
                type="number"
                min={0}
                step={50}
                value={plEmployerComp}
                onChange={(e) => setPlEmployerComp(Math.max(0, Number(e.target.value)))}
                className="w-24 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-right text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Expense Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">
                  {housingMode === 'dorm' ? '🎓 Univ. Dorm Rent:' : '🏠 Private Room Rent:'}
                </span>
                <span className="font-mono font-semibold text-emerald-300">€{plPlan.effectiveRent}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Utilities & Internet:</span>
                <span className="font-mono font-semibold text-slate-200">
                  {plPlan.effectiveUtilities === 0 ? '€0 (Included)' : `€${plPlan.effectiveUtilities}/mo`}
                </span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Food & Groceries:</span>
                <span className="font-mono font-semibold text-slate-200">€{plPlan.city.foodGroceries}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Public Transport:</span>
                <span className="font-mono font-semibold text-slate-200">€{plPlan.city.publicTransport}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Other Living Costs:</span>
                <span className="font-mono font-semibold text-slate-200">€{plPlan.city.otherLiving}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Flights + Deposit (1x):</span>
                <span className="font-mono font-semibold text-slate-300">
                  €{plPlan.city.travelFromPortugal} + €{plPlan.effectiveDeposit}
                </span>
              </div>
            </div>

            {housingMode === 'dorm' && (
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>🎓 Staying in a {plCity} University Dormitory saves you:</span>
                <span className="font-mono font-black">
                  €{plPlan.monthlyDormSavings}/mo (€{plPlan.totalDormSavingsForDuration} over {durationMonths} mo)
                </span>
              </div>
            )}

            {/* Summary Totals */}
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Estimated Monthly Living Expenses:</span>
                <span className="font-mono font-bold text-white">€{plPlan.monthlyExpenses}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Monthly Financial Gap / Surplus:</span>
                <span
                  className={`font-mono font-bold ${
                    plPlan.monthlyGapOrSurplus >= 0 ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {plPlan.monthlyGapOrSurplus >= 0 ? `+€${plPlan.monthlyGapOrSurplus}/mo surplus` : `€${plPlan.monthlyGapOrSurplus}/mo gap`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-indigo-800/40">
                <span className="text-slate-300">Total Expenses ({durationMonths} mo + flights):</span>
                <span className="font-mono font-bold text-slate-200">
                  €{plPlan.totalExpensesNetDeposit} (+€{plPlan.effectiveDeposit} refundable deposit)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Scholarship + Confirmed Pay:</span>
                <span className="font-mono font-bold text-emerald-400">€{plPlan.totalFunding}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-indigo-800/40">
                <span className="font-bold text-white">Estimated Personal Contribution ({durationMonths} mo):</span>
                <span className="font-mono font-black text-amber-300">€{plPlan.estimatedPersonalContribution}</span>
              </div>
            </div>

            {/* Nearest University Dormitories in Selected Polish City */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-indigo-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  Nearest University Dormitories in {plCity} ({plPlan.dormOptions.length})
                </span>
                <button
                  onClick={() =>
                    openExternal(`https://www.google.com/maps/search/Dom+Studencki+University+Dormitory+${encodeURIComponent(plCity)}+Poland`)
                  }
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>View All on Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                {plPlan.dormOptions.map((dorm) => (
                  <div key={dorm.id} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1 text-[11px]">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">{dorm.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-[10px] shrink-0">
                        ~€{dorm.monthlyPriceEur}/mo
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">{dorm.addressOrDistrict} • {dorm.monthlyPriceRangeText}</div>
                    <div className="text-[10px] text-indigo-300">{dorm.proximityToTechHubs}</div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9.5px] text-slate-500">{dorm.eligibilityNote}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openExternal(`https://www.google.com/maps/search/?api=1&query=${dorm.mapsQuery}`)}
                          className="text-[10px] font-semibold text-slate-300 hover:text-white underline"
                        >
                          Map ↗
                        </button>
                        <button
                          onClick={() => openExternal(dorm.bookingUrl)}
                          className="px-2 py-0.5 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-[10px] font-bold"
                        >
                          Dorm Portal ↗
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div><strong>Housing Note:</strong> {plPlan.city.housingNote}</div>
              <div><strong>Sources (Estimates):</strong> {plPlan.city.sources}</div>
            </div>
          </div>

          {/* RIGHT COLUMN: ANY EUROPEAN COUNTRY COMPARISON */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/30 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {comparePlan.city.countryCode} • {comparePlan.city.country}
                </span>
                <select
                  value={compareCity}
                  onChange={(e) => setCompareCity(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  <optgroup label="Group 1 — €650/month (NO, DK)">
                    <option value="Oslo">Oslo, Norway (NO — €650/mo)</option>
                    <option value="Copenhagen">Copenhagen, Denmark (DK — €650/mo)</option>
                  </optgroup>
                  <optgroup label="Group 2 — €600/month (EE, SI, SK, CZ)">
                    <option value="Tallinn">Tallinn, Estonia (EE — €600/mo)</option>
                    <option value="Tartu">Tartu, Estonia (EE — €600/mo)</option>
                    <option value="Ljubljana">Ljubljana, Slovenia (SI — €600/mo)</option>
                    <option value="Bratislava">Bratislava, Slovakia (SK — €600/mo)</option>
                    <option value="Prague">Prague, Czechia (CZ — €600/mo)</option>
                    <option value="Brno">Brno, Czechia (CZ — €600/mo)</option>
                  </optgroup>
                  <optgroup label="Group 3 — €550/month (HR, HU, BG, RS, PL)">
                    <option value="Zagreb">Zagreb, Croatia (HR — €550/mo)</option>
                    <option value="Split">Split, Croatia (HR — €550/mo)</option>
                    <option value="Budapest">Budapest, Hungary (HU — €550/mo)</option>
                    <option value="Sofia">Sofia, Bulgaria (BG — €550/mo)</option>
                    <option value="Novi Sad">Novi Sad, Serbia (RS — €550/mo)</option>
                    <option value="Belgrade">Belgrade, Serbia (RS — €550/mo)</option>
                  </optgroup>
                </select>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-cyan-300 block">
                  IPCA {comparePlan.scholarshipGroup} Scholarship
                </span>
                <span className="text-sm font-black text-emerald-400">
                  €{comparePlan.monthlyScholarship}/mo (€{comparePlan.totalScholarship} / {durationMonths} mo)
                </span>
              </div>
            </div>

            {/* Employer Stipend Input */}
            <div className="flex items-center justify-between bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-300 font-semibold block">Confirmed Employer Compensation (€/mo):</span>
                <span className="text-[10px] text-slate-500">{comparePlan.city.typicalPaidStipendRange}</span>
              </div>
              <input
                type="number"
                min={0}
                step={50}
                value={compareEmployerComp}
                onChange={(e) => setCompareEmployerComp(Math.max(0, Number(e.target.value)))}
                className="w-24 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-right text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Expense Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">
                  {housingMode === 'dorm' ? '🎓 Univ. Dorm Rent:' : '🏠 Private Room Rent:'}
                </span>
                <span className="font-mono font-semibold text-emerald-300">€{comparePlan.effectiveRent}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Utilities & Internet:</span>
                <span className="font-mono font-semibold text-slate-200">
                  {comparePlan.effectiveUtilities === 0 ? '€0 (Included)' : `€${comparePlan.effectiveUtilities}/mo`}
                </span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Food & Groceries:</span>
                <span className="font-mono font-semibold text-slate-200">€{comparePlan.city.foodGroceries}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Public Transport:</span>
                <span className="font-mono font-semibold text-slate-200">€{comparePlan.city.publicTransport}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Other Living Costs:</span>
                <span className="font-mono font-semibold text-slate-200">€{comparePlan.city.otherLiving}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Flights + Deposit (1x):</span>
                <span className="font-mono font-semibold text-slate-300">
                  €{comparePlan.city.travelFromPortugal} + €{comparePlan.effectiveDeposit}
                </span>
              </div>
            </div>

            {housingMode === 'dorm' && (
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>🎓 Staying in {compareCity} University Dormitory saves you:</span>
                <span className="font-mono font-black">
                  €{comparePlan.monthlyDormSavings}/mo (€{comparePlan.totalDormSavingsForDuration} over {durationMonths} mo)
                </span>
              </div>
            )}

            {/* Summary Totals */}
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Estimated Monthly Living Expenses:</span>
                <span className="font-mono font-bold text-white">€{comparePlan.monthlyExpenses}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Monthly Financial Gap / Surplus:</span>
                <span
                  className={`font-mono font-bold ${
                    comparePlan.monthlyGapOrSurplus >= 0 ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {comparePlan.monthlyGapOrSurplus >= 0
                    ? `+€${comparePlan.monthlyGapOrSurplus}/mo surplus`
                    : `€${comparePlan.monthlyGapOrSurplus}/mo gap`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-cyan-800/40">
                <span className="text-slate-300">Total Expenses ({durationMonths} mo + flights):</span>
                <span className="font-mono font-bold text-slate-200">
                  €{comparePlan.totalExpensesNetDeposit} (+€{comparePlan.effectiveDeposit} refundable deposit)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Scholarship + Confirmed Pay:</span>
                <span className="font-mono font-bold text-emerald-400">€{comparePlan.totalFunding}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-cyan-800/40">
                <span className="font-bold text-white">Estimated Personal Contribution ({durationMonths} mo):</span>
                <span className="font-mono font-black text-amber-300">€{comparePlan.estimatedPersonalContribution}</span>
              </div>
            </div>

            {/* Nearest University Dormitories in Selected Comparison City */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-cyan-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  Nearest University Student Residences in {compareCity} ({comparePlan.dormOptions.length})
                </span>
                <button
                  onClick={() =>
                    openExternal(
                      `https://www.google.com/maps/search/University+Student+Dormitory+${encodeURIComponent(
                        compareCity + ' ' + comparePlan.city.country
                      )}`
                    )
                  }
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All on Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                {comparePlan.dormOptions.map((dorm) => (
                  <div key={dorm.id} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1 text-[11px]">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">{dorm.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-[10px] shrink-0">
                        ~€{dorm.monthlyPriceEur}/mo
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">{dorm.addressOrDistrict} • {dorm.monthlyPriceRangeText}</div>
                    <div className="text-[10px] text-cyan-300">{dorm.proximityToTechHubs}</div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9.5px] text-slate-500">{dorm.eligibilityNote}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openExternal(`https://www.google.com/maps/search/?api=1&query=${dorm.mapsQuery}`)}
                          className="text-[10px] font-semibold text-slate-300 hover:text-white underline"
                        >
                          Map ↗
                        </button>
                        <button
                          onClick={() => openExternal(dorm.bookingUrl)}
                          className="px-2 py-0.5 rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 text-[10px] font-bold"
                        >
                          Dorm Portal ↗
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div><strong>Housing Note:</strong> {comparePlan.city.housingNote}</div>
              <div><strong>Sources (Estimates):</strong> {comparePlan.city.sources}</div>
            </div>
          </div>
        </div>

        {/* Verification & Eligibility Notice */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Important Verification Note:</strong> {IPCA_SCHOLARSHIP_CONFIG.confirmationNotice}{' '}
            Living costs above are market estimates (Nov 2026) and vary by housing type; enter confirmed employer compensation only when verified in an internship offer.
          </div>
        </div>
      </div>

      {/* Featured Companies Ready for Contact across 11 Countries */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Top Rated Companies for Your Degree (Poland + 10 EU Countries)
            </h3>
            <p className="text-xs text-slate-400">Ranked objectively by 0–100 IPCA Web Multimedia fit score</p>
          </div>
          <button
            onClick={() => setActiveTab('discovery')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            View all companies →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'comp-brainly',
              name: 'Brainly',
              city: 'Kraków, Poland (PL • €550/mo)',
              fit: 97,
              role: 'Frontend / Web Engineering Intern',
              tech: ['React', 'TypeScript', 'Next.js', 'Figma'],
              reason: 'Global HQ in Kraków. Direct match for modern web development & UI/UX.',
            },
            {
              id: 'comp-hr-infinum',
              name: 'Infinum',
              city: 'Zagreb, Croatia (HR • €550/mo)',
              fit: 98,
              role: 'Frontend Web (React/TS) & UI/UX Intern',
              tech: ['React', 'TypeScript', 'Next.js', 'Figma'],
              reason: 'Premier Croatian digital product agency with Infinum Academy & verified careers@infinum.com.',
            },
            {
              id: 'comp-cz-strv',
              name: 'STRV',
              city: 'Prague & Brno, Czechia (CZ • €600/mo)',
              fit: 98,
              role: 'Frontend Web / UI/UX Design & QA Intern',
              tech: ['React', 'TypeScript', 'Next.js', 'Figma'],
              reason: '100% English-speaking digital product agency in Prague & Brno with STRV Academy.',
            },
            {
              id: 'comp-dk-signifly',
              name: 'Signifly',
              city: 'Copenhagen, Denmark (DK • €650/mo)',
              fit: 98,
              role: 'Frontend Web & Digital Design Intern',
              tech: ['React', 'Next.js', 'TypeScript', 'Figma'],
              reason: 'Award-winning Copenhagen digital agency hosting 4–5 month semester interns (Group 1 €650/mo).',
            },
            {
              id: 'comp-si-povio',
              name: 'Povio',
              city: 'Ljubljana, Slovenia (SI • €600/mo)',
              fit: 98,
              role: 'Frontend (React/TS) & UI/UX Design Intern',
              tech: ['React', 'TypeScript', 'Figma', 'QA'],
              reason: 'Flagship Slovenian product agency in Ljubljana with Povio Academy & €165/mo student dorms.',
            },
            {
              id: 'comp-hu-uxstudio',
              name: 'UX studio',
              city: 'Budapest, Hungary (HU • €550/mo)',
              fit: 98,
              role: 'UI/UX Product Design Intern',
              tech: ['Figma', 'UI/UX Design', 'Prototyping', 'Web Design'],
              reason: 'Internationally acclaimed Budapest UX product design agency working 100% in English.',
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedCompanyId(item.id);
                setActiveTab('research');
              }}
              className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-indigo-500/50 cursor-pointer transition shadow-sm space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    {item.city}
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  {item.fit}% Fit
                </div>
              </div>

              <div className="text-xs font-semibold text-indigo-300 bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-900/40 truncate">
                {item.role}
              </div>

              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{item.reason}</p>

              <div className="flex flex-wrap gap-1">
                {item.tech.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
