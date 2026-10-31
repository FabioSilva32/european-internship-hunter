import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IPCA_SCHOLARSHIP_CONFIG,
  POLISH_CITIES,
  DUTCH_CITIES,
  calculateCityFinancials,
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
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { metrics, setActiveTab, setSelectedCompanyId, selectedCountry, setSelectedCountry } = useApp();

  // Interactive Financial Comparison Calculator State
  const [plCity, setPlCity] = useState<string>('Kraków');
  const [nlCity, setNlCity] = useState<string>('Rotterdam');
  const [durationMonths, setDurationMonths] = useState<number>(5);
  const [plEmployerComp, setPlEmployerComp] = useState<number>(0);
  const [nlEmployerComp, setNlEmployerComp] = useState<number>(0);
  const [cityHubFilter, setCityHubFilter] = useState<'ALL' | 'PL' | 'NL'>('ALL');

  const plPlan = calculateCityFinancials(plCity, durationMonths, plEmployerComp);
  const nlPlan = calculateCityFinancials(nlCity, durationMonths, nlEmployerComp);

  const kpis = [
    {
      title: 'Companies Discovered',
      value: metrics?.totalCompanies || 0,
      sub: `${metrics?.worthContacting || 0} worth contacting (PL & NL)`,
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
      sub: 'Feb–June 2027 window',
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
      sub: `${metrics?.rejectionsCount || 0} rejections processed`,
      icon: Users,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
  ];

  const cityHubs = [
    { city: 'Kraków', country: 'PL', count: 8, percentage: 85, tag: 'PL #1 Hub (€600/mo Group 2)' },
    { city: 'Warsaw', country: 'PL', count: 7, percentage: 75, tag: 'PL Capital Tech & Gaming' },
    { city: 'Amsterdam', country: 'NL', count: 4, percentage: 65, tag: 'NL Digital & Creative Hub (€650/mo Group 1)' },
    { city: 'Rotterdam / Delft', country: 'NL', count: 3, percentage: 55, tag: 'NL Agency & VR Hub (€650/mo Group 1)' },
    { city: 'Utrecht / Eindhoven', country: 'NL', count: 3, percentage: 55, tag: 'NL Interactive & Brainport Tech' },
    { city: 'Gdańsk / Wrocław / Poznań', country: 'PL', count: 5, percentage: 60, tag: 'PL Software & UX Consultancies' },
    { city: 'The Hague / Groningen / Breda', country: 'NL', count: 4, percentage: 50, tag: 'NL Affordable Tech Cities' },
  ].filter((h) => (cityHubFilter === 'ALL' ? true : h.country === cityHubFilter));

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Hero Action Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-purple-950/40 border border-indigo-500/20 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>IPCA Curricular Internship Campaign 2027 • Poland (PL) & Netherlands (NL)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Poland & Netherlands Tech, Digital Agency & Gaming Pipeline
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Targeting software engineering hubs, digital agencies, and studios across{' '}
              <strong className="text-indigo-200">Poland (Kraków, Warsaw, Gdańsk, Wrocław)</strong> and{' '}
              <strong className="text-orange-200">the Netherlands (Amsterdam, Rotterdam, Utrecht, Eindhoven, Delft, Breda)</strong>{' '}
              for a 4–5 month placement (February – June/July 2027) in Web Development, Frontend/Backend, UI/UX, Multimedia, and Game QA.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setSelectedCountry('Poland');
                setActiveTab('discovery');
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition"
            >
              PL Opportunities
            </button>
            <button
              onClick={() => {
                setSelectedCountry('Netherlands');
                setActiveTab('discovery');
              }}
              className="px-3.5 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-200 text-xs font-bold transition"
            >
              NL Opportunities
            </button>
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
                Application Pipeline Progress (Poland & Netherlands)
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

          {/* Safety & Responsible Automation Guarantee Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-200">Responsible Automation Safeguards Active</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Manual approval required for all outgoing drafts. Daily send limit enforced (max 20 emails/day). Duplicate contact prevention, English-by-default outreach, and verified versus speculative labeling active across both Poland and the Netherlands.
              </p>
            </div>
          </div>
        </div>

        {/* Opportunities by Polish & Dutch Cities */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                Target Hubs (PL & NL)
              </h3>
              <p className="text-xs text-slate-400">Opportunity density by city</p>
            </div>
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-[10px] font-bold">
              {(['ALL', 'PL', 'NL'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCityHubFilter(tab)}
                  className={`px-2 py-0.5 rounded transition ${
                    cityHubFilter === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {cityHubs.map((loc, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        loc.country === 'NL'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {loc.country}
                    </span>
                    <span>{loc.city}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-[165px]">{loc.tag}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      loc.country === 'NL'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-400'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}
                    style={{ width: `${loc.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 text-purple-300 text-[11px] leading-relaxed">
            💡 <strong>PL & NL Strategy:</strong> Kraków & Warsaw offer lower student living costs with high tech/gaming density, while Rotterdam, Utrecht, Eindhoven & Amsterdam offer world-class digital agencies and Group 1 (€650/mo) IPCA scholarship support.
          </div>
        </div>
      </div>

      {/* IPCA Scholarship & Financial Comparison Calculator (Poland vs. Netherlands) */}
      <div className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                IPCA Scholarship & Living Cost Comparison: Poland (PL) vs. Netherlands (NL)
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
              Compare city-specific living expenses, IPCA Erasmus+ mobility grant rates (<strong>Poland Group 2: €600/mo</strong> vs.{' '}
              <strong>Netherlands Group 1: €650/mo</strong>), employer compensation, and personal contribution for an ~{durationMonths}-month placement.
            </p>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-medium">Duration:</span>
            {[4, 5].map((m) => (
              <button
                key={m}
                onClick={() => setDurationMonths(m)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                  durationMonths === m
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {m} Months
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* POLAND (PL) COLUMN */}
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
                      {c}, Poland
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
                <span className="text-slate-400">Rent & Housing (Est.):</span>
                <span className="font-mono font-semibold text-slate-200">€{plPlan.city.rent}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Utilities & Internet:</span>
                <span className="font-mono font-semibold text-slate-200">€{plPlan.city.utilitiesInternet}/mo</span>
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
                  €{plPlan.city.travelFromPortugal} + €{plPlan.city.initialDeposit}
                </span>
              </div>
            </div>

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
                  €{plPlan.totalExpensesNetDeposit} (+€{plPlan.city.initialDeposit} refundable deposit)
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

            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div><strong>Housing Note:</strong> {plPlan.city.housingNote}</div>
              <div><strong>Sources (Estimates):</strong> {plPlan.city.sources}</div>
            </div>
          </div>

          {/* NETHERLANDS (NL) COLUMN */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-orange-500/30 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-black bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  NL • Netherlands
                </span>
                <select
                  value={nlCity}
                  onChange={(e) => setNlCity(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-orange-500"
                >
                  {DUTCH_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}, Netherlands
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-orange-300 block">
                  IPCA {nlPlan.scholarshipGroup} Scholarship
                </span>
                <span className="text-sm font-black text-emerald-400">
                  €{nlPlan.monthlyScholarship}/mo (€{nlPlan.totalScholarship} / {durationMonths} mo)
                </span>
              </div>
            </div>

            {/* Employer Stipend Input */}
            <div className="flex items-center justify-between bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-300 font-semibold block">Confirmed Employer Compensation (€/mo):</span>
                <span className="text-[10px] text-slate-500">{nlPlan.city.typicalPaidStipendRange}</span>
              </div>
              <input
                type="number"
                min={0}
                step={50}
                value={nlEmployerComp}
                onChange={(e) => setNlEmployerComp(Math.max(0, Number(e.target.value)))}
                className="w-24 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-right text-xs font-mono text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Expense Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Rent & Housing (Est.):</span>
                <span className="font-mono font-semibold text-slate-200">€{nlPlan.city.rent}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Utilities & Internet:</span>
                <span className="font-mono font-semibold text-slate-200">€{nlPlan.city.utilitiesInternet}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Food & Groceries:</span>
                <span className="font-mono font-semibold text-slate-200">€{nlPlan.city.foodGroceries}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Public Transport:</span>
                <span className="font-mono font-semibold text-slate-200">€{nlPlan.city.publicTransport}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Other Living Costs:</span>
                <span className="font-mono font-semibold text-slate-200">€{nlPlan.city.otherLiving}/mo</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex justify-between">
                <span className="text-slate-400">Flights + Deposit (1x):</span>
                <span className="font-mono font-semibold text-slate-300">
                  €{nlPlan.city.travelFromPortugal} + €{nlPlan.city.initialDeposit}
                </span>
              </div>
            </div>

            {/* Summary Totals */}
            <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-800/40 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Estimated Monthly Living Expenses:</span>
                <span className="font-mono font-bold text-white">€{nlPlan.monthlyExpenses}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Monthly Financial Gap / Surplus:</span>
                <span
                  className={`font-mono font-bold ${
                    nlPlan.monthlyGapOrSurplus >= 0 ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {nlPlan.monthlyGapOrSurplus >= 0 ? `+€${nlPlan.monthlyGapOrSurplus}/mo surplus` : `€${nlPlan.monthlyGapOrSurplus}/mo gap`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-orange-800/40">
                <span className="text-slate-300">Total Expenses ({durationMonths} mo + flights):</span>
                <span className="font-mono font-bold text-slate-200">
                  €{nlPlan.totalExpensesNetDeposit} (+€{nlPlan.city.initialDeposit} refundable deposit)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Scholarship + Confirmed Pay:</span>
                <span className="font-mono font-bold text-emerald-400">€{nlPlan.totalFunding}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-orange-800/40">
                <span className="font-bold text-white">Estimated Personal Contribution ({durationMonths} mo):</span>
                <span className="font-mono font-black text-amber-300">€{nlPlan.estimatedPersonalContribution}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div><strong>Housing Note:</strong> {nlPlan.city.housingNote}</div>
              <div><strong>Sources (Estimates):</strong> {nlPlan.city.sources}</div>
            </div>
          </div>
        </div>

        {/* Verification & Eligibility Notice */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Important Verification Note:</strong> {IPCA_SCHOLARSHIP_CONFIG.confirmationNotice}{' '}
            Living costs above are market estimates (Oct 2026) and vary by housing type; enter confirmed employer compensation only when verified in an internship offer.
          </div>
        </div>
      </div>

      {/* Featured Companies Ready for Contact */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Top Rated Companies for Your Degree (Poland & Netherlands)
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
              city: 'Kraków, Poland (PL)',
              fit: 97,
              role: 'Frontend / Web Engineering Intern',
              tech: ['React', 'TypeScript', 'Next.js', 'Figma'],
              reason: 'Global HQ in Kraków. Direct match for modern web development & UI/UX.',
            },
            {
              id: 'comp-nl-dpdk',
              name: 'DPDK Digital Agency',
              city: 'Rotterdam, Netherlands (NL)',
              fit: 97,
              role: 'Creative Frontend / Web Dev Intern',
              tech: ['TypeScript', 'React', 'Next.js', 'UI/UX'],
              reason: 'Award-winning Rotterdam digital studio hosting 5-month international web & design interns.',
            },
            {
              id: 'comp-nl-dept',
              name: 'DEPT® Digital Agency',
              city: 'Amsterdam & Rotterdam (NL)',
              fit: 96,
              role: 'Frontend Development & UI/UX Intern',
              tech: ['React', 'TypeScript', 'Figma', 'Design Systems'],
              reason: 'Flagship Dutch digital agency with structured Feb–Jun semester internships & stagevergoeding.',
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
