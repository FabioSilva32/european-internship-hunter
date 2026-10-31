import React, { useState, useEffect } from 'react';
import { useApp, SupportedCountryFilter } from '../../context/AppContext';
import { Opportunity } from '../../types';
import { POLISH_CITIES, DUTCH_CITIES } from '../../data/financialComparisonData';
import {
  Compass,
  Search,
  MapPin,
  ExternalLink,
  Sparkles,
  Building2,
  Calendar,
  PlusCircle,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Globe,
  Languages,
} from 'lucide-react';

export const Discovery: React.FC = () => {
  const {
    selectedCountry,
    setSelectedCountry,
    setSelectedCompanyId,
    setSelectedOpportunityId,
    setActiveTab,
    showToast,
    openExternal,
    refreshMetrics,
  } = useApp();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);

  // Filters
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<'all' | 'official' | 'speculative'>('all');
  const [dateMatchOnly, setDateMatchOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reset city filter if switching to a country where the selected city doesn't belong
  useEffect(() => {
    if (selectedCountry === 'Poland' && DUTCH_CITIES.includes(cityFilter)) {
      setCityFilter('All');
    } else if (selectedCountry === 'Netherlands' && POLISH_CITIES.includes(cityFilter)) {
      setCityFilter('All');
    }
  }, [selectedCountry]);

  const loadOpportunities = async () => {
    setLoading(true);
    if (window.desktopAPI?.getOpportunities) {
      try {
        const filters: any = {
          country: selectedCountry,
          city: cityFilter,
          category: categoryFilter,
          search: searchQuery,
          dateMatchOnly,
          officialOnly: typeFilter === 'official',
          speculativeOnly: typeFilter === 'speculative',
        };
        const data = await window.desktopAPI.getOpportunities(filters);
        setOpportunities(data);
      } catch (err: any) {
        showToast('Failed to fetch opportunities: ' + err.message, 'error');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOpportunities();
  }, [selectedCountry, cityFilter, categoryFilter, typeFilter, dateMatchOnly, searchQuery]);

  const handleRunSearch = async () => {
    setSearching(true);
    const countryLabel =
      selectedCountry === 'All' ? 'Poland & the Netherlands' : selectedCountry;
    showToast(
      `Executing multi-provider query (Greenhouse, Lever, Ashby, Official Career Pages) for ${countryLabel}...`,
      'info'
    );
    if (window.desktopAPI?.runSearch) {
      try {
        const res = await window.desktopAPI.runSearch({
          country: selectedCountry,
          city: cityFilter,
          category: categoryFilter,
        });
        showToast(`Sync complete! Found ${res.newOpportunities} verified vacancies.`, 'success');
        await loadOpportunities();
        await refreshMetrics();
      } catch (err: any) {
        showToast('Search error: ' + err.message, 'error');
      }
    }
    setSearching(false);
  };

  const handleAddToTracker = async (opp: Opportunity) => {
    if (window.desktopAPI?.createApplication) {
      try {
        await window.desktopAPI.createApplication({
          company_id: opp.company_id,
          opportunity_id: opp.id,
          target_role: opp.title,
          city: opp.city,
          country: opp.country || opp.company_country || 'Poland',
          status: 'Ready to contact',
          priority: opp.fit_score >= 90 ? 'High' : 'Medium',
          notes: `Added from Discovery (${opp.city}, ${opp.country || 'Poland'}). Source: ${opp.source_name}`,
        });
        showToast(`Added "${opp.title}" to Application Tracker.`, 'success');
        refreshMetrics();
      } catch (err: any) {
        showToast('Error adding to tracker: ' + err.message, 'error');
      }
    }
  };

  const handleOpenGenerator = (opp: Opportunity) => {
    setSelectedCompanyId(opp.company_id);
    setSelectedOpportunityId(opp.id);
    setActiveTab('generator');
  };

  const handleOpenResearch = (opp: Opportunity) => {
    setSelectedCompanyId(opp.company_id);
    setActiveTab('research');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#090d16]">
      {/* Search & Filter Toolbar */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-3.5 shrink-0">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by company, city (Kraków, Amsterdam, Rotterdam, Utrecht...), React, TypeScript, Figma, QA..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Sync Button */}
          <button
            onClick={handleRunSearch}
            disabled={searching}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${searching ? 'animate-spin' : ''}`} />
            <span>{searching ? 'Syncing...' : 'Sync Live Providers (PL & NL)'}</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          {/* Country Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/80 px-2.5 py-1 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400 text-[11px]">Country:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as SupportedCountryFilter)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-200">
                All Countries (PL + NL)
              </option>
              <option value="Poland" className="bg-slate-900 text-slate-200">
                Poland (PL — €600/mo Group 2)
              </option>
              <option value="Netherlands" className="bg-slate-900 text-slate-200">
                Netherlands (NL — €650/mo Group 1)
              </option>
            </select>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/80 px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400 text-[11px]">City:</span>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-200">
                {selectedCountry === 'Poland'
                  ? 'All Poland Cities'
                  : selectedCountry === 'Netherlands'
                  ? 'All Netherlands Cities'
                  : 'All Cities (Poland & Netherlands)'}
              </option>
              {(selectedCountry === 'All' || selectedCountry === 'Poland') && (
                <optgroup label="Poland (PL)" className="bg-slate-900 text-indigo-300">
                  <option value="Kraków" className="bg-slate-900 text-slate-200">Kraków (PL)</option>
                  <option value="Warsaw" className="bg-slate-900 text-slate-200">Warsaw (PL)</option>
                  <option value="Gdańsk" className="bg-slate-900 text-slate-200">Gdańsk / Tricity (PL)</option>
                  <option value="Wrocław" className="bg-slate-900 text-slate-200">Wrocław (PL)</option>
                  <option value="Poznań" className="bg-slate-900 text-slate-200">Poznań (PL)</option>
                </optgroup>
              )}
              {(selectedCountry === 'All' || selectedCountry === 'Netherlands') && (
                <optgroup label="Netherlands (NL)" className="bg-slate-900 text-emerald-300">
                  <option value="Amsterdam" className="bg-slate-900 text-slate-200">Amsterdam (NL)</option>
                  <option value="Rotterdam" className="bg-slate-900 text-slate-200">Rotterdam (NL)</option>
                  <option value="Utrecht" className="bg-slate-900 text-slate-200">Utrecht (NL)</option>
                  <option value="Eindhoven" className="bg-slate-900 text-slate-200">Eindhoven (NL)</option>
                  <option value="The Hague" className="bg-slate-900 text-slate-200">The Hague (NL)</option>
                  <option value="Groningen" className="bg-slate-900 text-slate-200">Groningen (NL)</option>
                  <option value="Delft" className="bg-slate-900 text-slate-200">Delft (NL)</option>
                  <option value="Leiden" className="bg-slate-900 text-slate-200">Leiden (NL)</option>
                  <option value="Arnhem" className="bg-slate-900 text-slate-200">Arnhem (NL)</option>
                  <option value="Breda" className="bg-slate-900 text-slate-200">Breda (NL)</option>
                </optgroup>
              )}
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/80 px-2.5 py-1 rounded-lg">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400 text-[11px]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-200">All Categories</option>
              <option value="Frontend" className="bg-slate-900 text-slate-200">Web & Frontend / Backend Dev</option>
              <option value="UI/UX" className="bg-slate-900 text-slate-200">UI/UX & Digital Product Design</option>
              <option value="Multimedia" className="bg-slate-900 text-slate-200">Multimedia & Interactive Web</option>
              <option value="Software" className="bg-slate-900 text-slate-200">Software Development & QA</option>
              <option value="Game QA" className="bg-slate-900 text-slate-200">Game QA & Testing</option>
              <option value="Game Dev" className="bg-slate-900 text-slate-200">Game Development</option>
            </select>
          </div>

          {/* Vacancy vs Speculative Toggle */}
          <div className="flex items-center rounded-lg bg-slate-800/80 p-0.5 border border-slate-700/80 text-[11px]">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                typeFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('official')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                typeFilter === 'official' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Confirmed Vacancies
            </button>
            <button
              onClick={() => setTypeFilter('speculative')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                typeFilter === 'speculative' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Speculative Targets
            </button>
          </div>

          {/* 2027 Dates match toggle */}
          <button
            onClick={() => setDateMatchOnly(!dateMatchOnly)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition ${
              dateMatchOnly
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-semibold'
                : 'bg-slate-800/70 text-slate-400 border-slate-700/80 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Feb–June 2027 Only</span>
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>
            Showing <strong className="text-white">{opportunities.length}</strong> opportunities in{' '}
            <strong className="text-indigo-300">
              {selectedCountry === 'All' ? 'Poland (PL) & the Netherlands (NL)' : `${selectedCountry} (${selectedCountry === 'Netherlands' ? 'NL' : 'PL'})`}
            </strong>
          </span>
          <span className="text-[11px] text-slate-500">
            Ranked objectively by IPCA Web Multimedia fit, language & financial feasibility
          </span>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
            <span className="text-xs">Loading opportunities...</span>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 p-8 space-y-3">
            <Compass className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-300">No matching opportunities found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try broadening your country, city, or category filters, or click "Sync Live Providers (PL & NL)".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {opportunities.map((opp) => {
              const oppCountry = opp.country || opp.company_country || 'Poland';
              const isNL = oppCountry === 'Netherlands' || opp.country_code === 'NL';
              const isoCode = isNL ? 'NL' : 'PL';
              return (
                <div
                  key={opp.id}
                  className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition shadow-sm space-y-3"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-tight">
                          {opp.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isNL
                              ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                              : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                          }`}
                        >
                          {isoCode} • {oppCountry}
                        </span>
                        {opp.is_official_vacancy === 1 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Confirmed Vacancy
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            Speculative Application
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {opp.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="font-semibold text-indigo-300 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                          {opp.company_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" />
                          {opp.city}, {oppCountry} ({opp.work_arrangement})
                        </span>
                        {opp.internship_start && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            {opp.internship_start} to {opp.internship_end} ({opp.duration_months} mo.)
                          </span>
                        )}
                        {opp.language_requirements && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <Languages className="w-3.5 h-3.5 text-emerald-400" />
                            {opp.language_requirements}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Fit Score Badge */}
                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-300">Fit Score</div>
                        <div className="text-lg font-black text-emerald-400 tracking-tight">
                          {opp.fit_score}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opportunity Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {opp.description}
                  </p>

                  {/* Tech chips & Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {opp.required_technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {opp.salary_info && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-medium">
                          {opp.salary_info}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-[10px] text-slate-400">
                        Source: {opp.source_name}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenResearch(opp)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>Research</span>
                      </button>
                      <button
                        onClick={() => handleAddToTracker(opp)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Track</span>
                      </button>
                      <button
                        onClick={() => handleOpenGenerator(opp)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Draft Email</span>
                      </button>
                      {opp.source_url && (
                        <button
                          onClick={() => openExternal(opp.source_url)}
                          title={`Open source on ${opp.source_name}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
