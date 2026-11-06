import React, { useState, useEffect } from 'react';
import { useApp, SupportedCountryFilter } from '../../context/AppContext';
import { Company, Priority } from '../../types';
import {
  calculateCityFinancials,
  IPCA_SCHOLARSHIP_CONFIG,
  SUPPORTED_COUNTRIES_LIST,
  getCountryMeta,
} from '../../data/financialComparisonData';
import {
  Building2,
  MapPin,
  Globe,
  Briefcase,
  Gamepad2,
  Sparkles,
  ExternalLink,
  Mail,
  Layers,
  UserCheck,
  TrendingUp,
  Calculator,
  GraduationCap,
  Home,
} from 'lucide-react';

export const CompanyResearch: React.FC = () => {
  const {
    selectedCompanyId,
    setSelectedCompanyId,
    setActiveTab,
    showToast,
    openExternal,
    refreshMetrics,
    selectedCountry,
    setSelectedCountry,
  } = useApp();

  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [housingMode, setHousingMode] = useState<'dorm' | 'private'>('dorm');

  // Load all companies for sidebar selection
  useEffect(() => {
    if (window.desktopAPI?.getCompanies) {
      window.desktopAPI.getCompanies({}).then((data: Company[]) => {
        setCompanyList(data);
      });
    }
  }, []);

  const filteredCompanyList = companyList.filter((c) => {
    if (selectedCountry === 'All') return true;
    const meta = getCountryMeta(selectedCountry);
    return (
      (c.country || 'Poland').toLowerCase() === selectedCountry.toLowerCase() ||
      (c.country_code || '').toUpperCase() === meta.countryCode
    );
  });

  // Load active company details
  const loadDetails = async () => {
    if (!selectedCompanyId) return;
    setLoading(true);
    if (window.desktopAPI?.getCompanyDetails) {
      try {
        const data = await window.desktopAPI.getCompanyDetails(selectedCompanyId);
        setCompany(data);
      } catch (err: any) {
        showToast('Error loading company: ' + err.message, 'error');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDetails();
  }, [selectedCompanyId]);

  const handlePriorityChange = async (priority: Priority) => {
    if (!company) return;
    if (window.desktopAPI?.updateCompanyPriority) {
      try {
        await window.desktopAPI.updateCompanyPriority(company.id, priority);
        setCompany({ ...company, priority });
        showToast(`Priority updated to ${priority}`, 'success');
        refreshMetrics();
      } catch (err: any) {
        showToast('Failed to update priority: ' + err.message, 'error');
      }
    }
  };

  const handleDraftForCompany = () => {
    setActiveTab('generator');
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#090d16]">
      {/* Left Company List Selector */}
      <div className="w-76 border-r border-slate-800 bg-slate-900/40 flex flex-col shrink-0">
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 shrink-0">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            Companies ({filteredCompanyList.length})
          </span>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as SupportedCountryFilter)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All (11)</option>
            {SUPPORTED_COUNTRIES_LIST.map((cnt) => (
              <option key={cnt.countryCode} value={cnt.country}>
                {cnt.countryCode} • {cnt.country} (€{cnt.monthlyRateEur})
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredCompanyList.map((c) => {
            const isSelected = c.id === selectedCompanyId;
            const meta = getCountryMeta(c.country || c.country_code);
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCompanyId(c.id)}
                className={`w-full p-2.5 rounded-xl text-left transition-all space-y-1 ${
                  isSelected
                    ? 'bg-indigo-600/20 border border-indigo-500/40 shadow-sm'
                    : 'hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {c.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      c.fit_score >= 90
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {c.fit_score}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    {c.city}
                    <span className={`px-1 py-0.1 rounded text-[9px] font-bold border ${meta.badgeColor}`}>
                      {meta.countryCode}
                    </span>
                  </span>
                  <span className={`text-[10px] font-medium ${c.priority === 'High' ? 'text-rose-400' : 'text-slate-400'}`}>
                    {c.priority}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Company Deep-Dive View */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Loading company details...
        </div>
      ) : !company ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Select a company to inspect details.
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Card */}
          {(() => {
            const compMeta = getCountryMeta(company.country || company.country_code);
            return (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-xl font-black text-white tracking-tight">{company.name}</h2>
                      {company.is_gaming === 1 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1">
                          <Gamepad2 className="w-3 h-3" />
                          Game Dev Studio
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {company.industry}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        {company.city}, {company.country || 'Poland'}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${compMeta.badgeColor}`}>
                          {compMeta.countryCode} • {compMeta.group} (€{compMeta.monthlyRateEur}/mo)
                        </span>
                      </span>
                      {company.website && (
                        <button
                          onClick={() => openExternal(company.website)}
                          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Website
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                      {company.careers_url && (
                        <button
                          onClick={() => openExternal(company.careers_url)}
                          className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          Careers Portal
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Priority & Draft Action */}
                  <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
                    <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 px-2 font-medium">Priority:</span>
                      {(['High', 'Medium', 'Low'] as Priority[]).map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePriorityChange(p)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                            company.priority === p
                              ? p === 'High'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : p === 'Medium'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-700 text-slate-200'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleDraftForCompany}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Email</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  {company.description}
                </p>
              </div>
            );
          })()}

          {/* Explainable Fit Score Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Transparent Fit Score Breakdown: {company.fit_score}/100
                </h3>
                <p className="text-xs text-slate-400">
                  Objective calculation based on your IPCA Web Multimedia profile & Feb–Jun 2027 timeline
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                {company.fit_score >= 88 ? 'HIGH PRIORITY MATCH' : 'STRONG CANDIDATE'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(company.fit_reasons || []).map((reason: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200">{reason.factor}</span>
                    <span className="text-emerald-400 font-mono">
                      {reason.score}/{reason.max} pts
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                      style={{ width: `${(reason.score / reason.max) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">{reason.text || reason.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* City Financial & IPCA Scholarship Snapshot + Nearest University Dormitories */}
          {(() => {
            const fin = calculateCityFinancials(company.city, 5, 0, housingMode);
            if (!fin) return null;
            const meta = getCountryMeta(fin.city.country);
            return (
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-emerald-400" />
                      IPCA Scholarship, University Dorms & Living Cost Snapshot: {fin.city.city}, {fin.city.country} (~5 Months)
                    </h3>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${meta.badgeColor}`}>
                      {fin.scholarshipGroup} — €{fin.monthlyScholarship}/month ({IPCA_SCHOLARSHIP_CONFIG.sourceLabel})
                    </span>
                  </div>

                  {/* Housing Mode Switcher */}
                  <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-[11px] font-bold">
                    <button
                      onClick={() => setHousingMode('dorm')}
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition ${
                        housingMode === 'dorm'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>🎓 University Dorm (€{fin.city.dormRent}/mo)</span>
                    </button>
                    <button
                      onClick={() => setHousingMode('private')}
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition ${
                        housingMode === 'private'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>🏠 Private Room / Airbnb (€{fin.city.rent}/mo)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">
                      Est. Monthly Living ({housingMode === 'dorm' ? 'Univ. Dorm' : 'Private'})
                    </div>
                    <div className="text-sm font-black text-white font-mono">€{fin.monthlyExpenses}/mo</div>
                    <div className="text-[10px] text-emerald-400">
                      {housingMode === 'dorm'
                        ? `Dorm ~€${fin.effectiveRent}/mo (Saves €${fin.monthlyDormSavings}/mo)`
                        : `Rent ~€${fin.effectiveRent}/mo + €${fin.effectiveUtilities} util`}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-300">IPCA Grant (5 mo)</div>
                    <div className="text-sm font-black text-emerald-400 font-mono">€{fin.totalScholarship}</div>
                    <div className="text-[10px] text-emerald-400/80">€{fin.monthlyScholarship}/mo ({fin.scholarshipGroup})</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Total 5-Mo Living + Flights</div>
                    <div className="text-sm font-black text-slate-200 font-mono">€{fin.totalExpensesNetDeposit}</div>
                    <div className="text-[10px] text-slate-500">+€{fin.effectiveDeposit} refundable deposit</div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                    <div className="text-[10px] text-amber-300">Monthly Balance (Unpaid)</div>
                    <div className={`text-sm font-black font-mono ${fin.monthlyGapOrSurplus >= 0 ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {fin.monthlyGapOrSurplus >= 0 ? `+€${fin.monthlyGapOrSurplus}/mo surplus` : `${fin.monthlyGapOrSurplus} €/mo gap`}
                    </div>
                    <div className="text-[10px] text-amber-400/80">5-mo personal: €{fin.estimatedPersonalContribution}</div>
                  </div>
                </div>

                {/* Nearest University Student Dormitories Next to This Company */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>Nearest University Student Dormitories Next to {company.name} ({fin.city.city})</span>
                    </div>
                    <button
                      onClick={() =>
                        openExternal(
                          `https://www.google.com/maps/search/${encodeURIComponent(
                            'University Student Dormitory near ' + company.name + ' ' + company.city + ' ' + (company.country || '')
                          )}`
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 transition"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Search Dorms Near {company.name} on Google Maps ↗</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {fin.dormOptions.map((dorm) => (
                      <div
                        key={dorm.id}
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-2 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-white leading-snug">{dorm.name}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-[10px] shrink-0">
                              ~€{dorm.monthlyPriceEur}/mo
                            </span>
                          </div>
                          <div className="text-[11px] text-indigo-300 font-medium">{dorm.university}</div>
                          <div className="text-[10.5px] text-slate-400">
                            📍 {dorm.addressOrDistrict} • <strong>{dorm.monthlyPriceRangeText}</strong>
                          </div>
                          <div className="text-[10.5px] text-emerald-300/90">🚇 {dorm.proximityToTechHubs}</div>
                          <div className="text-[10px] text-slate-500">{dorm.eligibilityNote}</div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1.5 border-t border-slate-800/80">
                          <button
                            onClick={() => openExternal(`https://www.google.com/maps/search/?api=1&query=${dorm.mapsQuery}`)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10.5px] font-semibold flex items-center gap-1 transition"
                          >
                            <MapPin className="w-3 h-3 text-purple-400" />
                            <span>View on Map ↗</span>
                          </button>
                          <button
                            onClick={() => openExternal(dorm.bookingUrl)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-[10.5px] font-bold flex items-center gap-1 transition"
                          >
                            <span>Official Dorm Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Why Your Degree is Relevant (Auto Pitch) */}
          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-2">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Tailored Outreach Angle: Why IPCA Web Multimedia Fits {company.name}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your degree in <strong>Desenvolvimento Web Multimédia at IPCA</strong> specifically combines <em>software engineering fundamentals</em>, <em>modern component-driven frontend architecture</em>, and <em>interactive multimedia/UI systems</em>. For {company.name}, you bring both the ability to code functional features in TypeScript/React/C# and the visual discernment required for clean UX design systems or rigorous bug verification.
            </p>
          </div>

          {/* Products & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Featured Products & Projects
              </h3>
              <div className="flex flex-wrap gap-2">
                {(company.products || []).map((p: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Engineering Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {(company.technologies || []).map((t: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verified Contacts & Careers Inboxes */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  Verified Recruiting & Career Inboxes
                </h3>
                <p className="text-xs text-slate-400">
                  Strictly verified from official website or public corporate registries
                </p>
              </div>
            </div>

            {company.contacts && company.contacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {company.contacts.map((ct: any) => (
                  <div
                    key={ct.id}
                    className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{ct.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {ct.source_type === 'verified_website' ? 'Verified Website' : 'Public Source'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{ct.role}</div>
                      <div className="text-xs text-indigo-400 font-mono flex items-center gap-1.5 pt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{ct.email}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleDraftForCompany}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition shrink-0"
                    >
                      Email
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 p-3 bg-slate-800/30 rounded-xl">
                No direct recruiter listed yet. Official contact point is the careers page or web form.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
