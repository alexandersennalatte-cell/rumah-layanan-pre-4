import React, { useState } from 'react';
import { Search, X, Sparkles, PhoneCall, Home, Map, Layers, MessageSquareWarning } from 'lucide-react';
import { NavTab, ServiceItem } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectService: (service: ServiceItem) => void;
  allServices: ServiceItem[];
  onOpenHotline: () => void;
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSelectService,
  allServices,
  onOpenHotline,
  activeTab = 'beranda',
  onTabChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const filteredQuickResults = searchQuery.trim()
    ? allServices.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Helper to render official Regent (Bupati) avatar portrait
  const renderBupatiAvatar = () => (
    <div className="relative group flex-shrink-0" title="Bupati Lamongan">
      <div
        className="rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-lg shadow-blue-900/50 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105"
        style={{ width: '68px', height: '68px' }}
      >
        <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative">
          <svg className="w-full h-full text-slate-300" fill="currentColor" viewBox="0 0 100 100">
            <rect fill="#1e293b" height="100" width="100"></rect>
            <circle cx="50" cy="38" fill="#f8fafc" r="20"></circle>
            <path d="M50 14 L28 26 L72 26 Z" fill="#0f172a"></path>
            <rect fill="#fbbf24" height="4" width="30" x="35" y="24"></rect>
            <circle cx="50" cy="22" fill="#fbbf24" r="3"></circle>
            <path d="M15 88 C15 62 32 58 50 58 C68 58 85 62 85 88 Z" fill="#ffffff"></path>
            <rect fill="#cbd5e1" height="30" width="6" x="47" y="58"></rect>
            <rect fill="#ef4444" height="6" rx="1" width="10" x="18" y="66"></rect>
            <rect fill="#ffffff" height="6" rx="1" width="10" x="18" y="72"></rect>
          </svg>
        </div>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-900/90 border border-blue-400/40 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-cyan-200 shadow-sm">
        Bupati
      </div>
    </div>
  );

  // Helper to render official Vice Regent (Wabup) avatar portrait
  const renderWabupAvatar = () => (
    <div className="relative group flex-shrink-0" title="Wakil Bupati Lamongan">
      <div
        className="rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 shadow-lg shadow-blue-900/50 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105"
        style={{ width: '68px', height: '68px' }}
      >
        <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative">
          <svg className="w-full h-full text-slate-300" fill="currentColor" viewBox="0 0 100 100">
            <rect fill="#1e293b" height="100" width="100"></rect>
            <circle cx="50" cy="38" fill="#f8fafc" r="20"></circle>
            <path d="M50 14 L28 26 L72 26 Z" fill="#0f172a"></path>
            <rect fill="#fbbf24" height="4" width="30" x="35" y="24"></rect>
            <circle cx="50" cy="22" fill="#fbbf24" r="3"></circle>
            <path d="M15 88 C15 62 32 58 50 58 C68 58 85 62 85 88 Z" fill="#ffffff"></path>
            <rect fill="#cbd5e1" height="30" width="6" x="47" y="58"></rect>
            <rect fill="#ef4444" height="6" rx="1" width="10" x="72" y="66"></rect>
            <rect fill="#ffffff" height="6" rx="1" width="10" x="72" y="72"></rect>
          </svg>
        </div>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-900/90 border border-blue-400/40 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-cyan-200 shadow-sm">
        Wabup
      </div>
    </div>
  );

  return (
    <header
      className="w-full px-4 sm:px-6 lg:px-8 pt-5 z-30 flex flex-col relative pb-5 gap-3 select-none"
      style={{
        background:
          'radial-gradient(70% 55% at 50% 100%, rgba(37, 99, 235, 0.55) 0%, rgba(29, 78, 216, 0.25) 50%, transparent 80%), radial-gradient(120% 80% at 50% 15%, rgb(30, 64, 175) 0%, rgb(29, 78, 216) 25%, rgb(30, 58, 138) 60%, rgb(12, 33, 77) 85%, rgb(6, 18, 38) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-3">
        {/* Top Utility & Emergency Bar */}
        <div className="flex items-center justify-between text-xs text-blue-200/90 px-1 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">
              Portal Resmi Terpadu Pemerintah Kabupaten Lamongan
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Navigation Links */}
            {onTabChange && (
              <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/60 text-xs">
                <button
                  onClick={() => onTabChange('beranda')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'beranda'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </button>
                <button
                  onClick={() => onTabChange('peta')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'peta'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Peta</span>
                </button>
                <button
                  onClick={() => onTabChange('layanan')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'layanan'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Layanan</span>
                </button>
                <button
                  onClick={() => onTabChange('lapor')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'lapor'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <MessageSquareWarning className="w-3.5 h-3.5" />
                  <span>Lapor</span>
                </button>
              </nav>
            )}

            <button
              onClick={onOpenHotline}
              className="flex items-center gap-1.5 text-rose-300 hover:text-white bg-rose-950/70 border border-rose-500/40 px-2.5 py-1 rounded-full transition-colors text-xs font-semibold shadow-sm active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Hotline Darurat 112</span>
            </button>
          </div>
        </div>

        {/* Main Header Content: On desktop, Left is Avatar + Title, Right is Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-6 mt-1 w-full">
          {/* Identity Section: On desktop positioned on the LEFT (order-1) */}
          <div
            className="order-2 lg:order-1 flex items-center justify-between lg:justify-start lg:gap-4 flex-1"
            data-purpose="official-branding"
          >
            {/* Left side: Avatar Icons (Bupati + Wabup on desktop) */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {renderBupatiAvatar()}
              {/* Desktop Wabup avatar (sits alongside Bupati on the left on desktop) */}
              <div className="hidden lg:block">
                {renderWabupAvatar()}
              </div>
            </div>

            {/* Title: Centered on mobile, Left-aligned on desktop */}
            <div className="flex-1 px-3 lg:px-0 text-center lg:text-left">
              <h1 className="font-extrabold tracking-wider text-white uppercase drop-shadow-md text-lg sm:text-xl lg:text-2xl leading-tight">
                RUMAH LAYANAN KABUPATEN LAMONGAN
              </h1>
            </div>

            {/* Mobile Wabup avatar (positioned on the right on mobile, hidden on desktop) */}
            <div className="lg:hidden">
              {renderWabupAvatar()}
            </div>
          </div>

          {/* Search Bar Form: On desktop positioned on the RIGHT (order-2) */}
          <div
            className="order-1 lg:order-2 w-full lg:w-80 xl:w-96 relative flex-shrink-0"
            data-purpose="search-container"
          >
            <div className="bg-white border border-slate-200 flex items-center justify-between pl-4 pr-1.5 py-1.5 shadow-xl rounded-xl transition-all focus-within:ring-2 focus-within:ring-cyan-400">
              <div className="flex items-center space-x-2.5 flex-1 mr-2">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  className="bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 w-full p-0 font-medium"
                  placeholder="Cari layanan KTP, Beasiswa..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 250)}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    aria-label="Bersihkan pencarian"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  if (filteredQuickResults.length > 0) {
                    onSelectService(filteredQuickResults[0]);
                  }
                }}
                className="bg-[#2563eb] hover:bg-blue-600 transition-colors text-white font-semibold text-xs px-5 py-2.5 shadow-md flex items-center justify-center rounded-lg active:scale-95 cursor-pointer flex-shrink-0"
              >
                eGo
              </button>
            </div>

            {/* Search Results Dropdown */}
            {isFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-2xl p-2 z-50 max-h-64 overflow-y-auto">
                <div className="text-xs uppercase font-bold text-slate-400 px-3 py-1 flex items-center justify-between border-b border-slate-800 mb-1">
                  <span>Hasil Pencarian ({filteredQuickResults.length})</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                {filteredQuickResults.length === 0 ? (
                  <div className="text-center py-4 text-xs sm:text-sm text-slate-400">
                    Tidak ada layanan yang cocok dengan "{searchQuery}"
                  </div>
                ) : (
                  filteredQuickResults.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        onSelectService(service);
                        onSearchChange('');
                      }}
                      className="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-cyan-300">
                          {service.title}
                        </span>
                        <span className="text-xs text-slate-400">
                          {service.category} • {service.opd}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                        Buka
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Golden Line Divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 242, 195, 0.8) 50%, rgba(255, 255, 255, 0.05) 100%)',
        }}
      />
    </header>
  );
};
