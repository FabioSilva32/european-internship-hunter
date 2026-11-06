import React from 'react';
import { useApp, SupportedCountryFilter } from '../../context/AppContext';
import { SUPPORTED_COUNTRIES_LIST } from '../../data/financialComparisonData';
import {
  Search,
  PauseCircle,
  PlayCircle,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  X,
  Globe,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedCountry,
    setSelectedCountry,
    isGlobalPaused,
    toggleGlobalPause,
    toasts,
    dismissToast,
    showToast,
    refreshMetrics,
  } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Executive Overview',
          subtitle: 'Pipeline metrics, IPCA Group 1/2/3 scholarship calculator & 11-country internship status',
        };
      case 'discovery':
        return {
          title: 'Opportunity & Company Discovery',
          subtitle: 'Search verified internships & speculative software houses/agencies across 11 European countries',
        };
      case 'research':
        return {
          title: 'Company Intelligence & Fit Score',
          subtitle: 'Deep analysis, tech stacks, university dorms, and verified recruitment contacts',
        };
      case 'generator':
        return {
          title: 'Personalized Email AI Generator',
          subtitle: 'Tailored outreach with 10 templates, 2 variants, and zero hallucinations',
        };
      case 'tracker':
        return {
          title: 'Application CRM Tracker',
          subtitle: 'Full 14-stage lifecycle: Discovered to Offer Received (Deadline: 30 Nov 2026)',
        };
      case 'batch':
        return {
          title: 'Batch Outreach & Approval Queue',
          subtitle: 'Review recipients, verify CVs, and safely dispatch with daily limits',
        };
      case 'followups':
        return {
          title: 'Follow-Up Pipeline & Automation',
          subtitle: 'Strict business-day rules (7 business days) with automatic suppression',
        };
      case 'profile':
        return {
          title: 'Profile, Skills & Multi-Version CVs',
          subtitle: 'Configure IPCA student details, dates, skills, and PDF resumes',
        };
      case 'settings':
        return {
          title: 'System Settings & Audit Trail',
          subtitle: 'API keys, daily rate limits, OAuth providers, and tamper-evident logs',
        };
      default:
        return {
          title: 'European Internship Hunter',
          subtitle: '2027 IPCA University Placement',
        };
    }
  };

  const { title, subtitle } = getTabTitle();

  const handleQuickSearch = async () => {
    setActiveTab('discovery');
    const targetLabel = selectedCountry === 'All' ? 'all 11 European countries' : selectedCountry;
    showToast(`Running multi-provider sync across ${targetLabel}...`, 'info');
    if (window.desktopAPI?.runSearch) {
      try {
        const res = await window.desktopAPI.runSearch({ country: selectedCountry, city: 'All', category: 'All' });
        showToast(`Search complete! Synced verified opportunities across ${targetLabel}.`, 'success');
        refreshMetrics();
      } catch (err: any) {
        showToast('Search encountered an error: ' + err.message, 'error');
      }
    }
  };

  return (
    <>
      <header className="h-16 px-6 bg-[#0b101d] border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
        {/* Title & Subtitle */}
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          <p className="text-xs text-slate-400 font-normal">{subtitle}</p>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2.5">
          {/* Global 11-Country Switcher */}
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-2.5 py-1 border border-slate-700 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <button
              onClick={() => setSelectedCountry('All')}
              className={`px-2 py-0.5 rounded transition ${
                selectedCountry === 'All'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All (11)
            </button>
            <button
              onClick={() => setSelectedCountry('Poland')}
              className={`px-2 py-0.5 rounded transition ${
                selectedCountry === 'Poland'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PL
            </button>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as SupportedCountryFilter)}
              className="bg-slate-900 text-slate-100 border border-slate-700 rounded px-2 py-0.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
              title="Switch active country filter"
            >
              <option value="All">All 11 Countries</option>
              <optgroup label="Group 1 — €650/month">
                <option value="Norway">Norway (NO — €650/mo)</option>
                <option value="Denmark">Denmark (DK — €650/mo)</option>
              </optgroup>
              <optgroup label="Group 2 — €600/month">
                <option value="Estonia">Estonia (EE — €600/mo)</option>
                <option value="Slovenia">Slovenia (SI — €600/mo)</option>
                <option value="Slovakia">Slovakia (SK — €600/mo)</option>
                <option value="Czechia">Czechia (CZ — €600/mo)</option>
              </optgroup>
              <optgroup label="Group 3 — €550/month">
                <option value="Poland">Poland (PL — €550/mo)</option>
                <option value="Croatia">Croatia (HR — €550/mo)</option>
                <option value="Hungary">Hungary (HU — €550/mo)</option>
                <option value="Bulgaria">Bulgaria (BG — €550/mo)</option>
                <option value="Serbia">Serbia (RS — €550/mo)</option>
              </optgroup>
            </select>
          </div>

          {/* Placement Deadline & Target Period Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deadline: 30 Nov 2026 • Placement: Feb–Jun 2027</span>
          </div>

          {/* Quick Search Action */}
          <button
            onClick={handleQuickSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {selectedCountry === 'All'
                ? 'Sync All 11 Countries'
                : `Search ${SUPPORTED_COUNTRIES_LIST.find((c) => c.country === selectedCountry)?.countryCode || selectedCountry}`}
            </span>
          </button>

          {/* Emergency Global Pause Toggle */}
          <button
            onClick={toggleGlobalPause}
            title={isGlobalPaused ? 'Resume outgoing email dispatch' : 'Emergency Stop: Pause all outgoing emails'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isGlobalPaused
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
          >
            {isGlobalPaused ? (
              <>
                <PlayCircle className="w-4 h-4 text-rose-400" />
                <span>Resume Dispatch</span>
              </>
            ) : (
              <>
                <PauseCircle className="w-4 h-4 text-emerald-400" />
                <span>Global Pause: Active</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Floating Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          let Icon = Info;
          let colorStyle = 'bg-slate-900/95 border-slate-700 text-slate-200';
          if (toast.type === 'success') {
            Icon = CheckCircle2;
            colorStyle = 'bg-emerald-950/95 border-emerald-700/60 text-emerald-200';
          } else if (toast.type === 'error') {
            Icon = XCircle;
            colorStyle = 'bg-rose-950/95 border-rose-700/60 text-rose-200';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            colorStyle = 'bg-amber-950/95 border-amber-700/60 text-amber-200';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-2.5 p-3 rounded-xl border shadow-xl backdrop-blur-md animate-fade-in ${colorStyle}`}
            >
              <Icon className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs font-medium leading-relaxed">{toast.message}</div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
