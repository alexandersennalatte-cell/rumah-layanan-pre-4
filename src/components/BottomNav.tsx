import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      className="glass-nav fixed bottom-0 left-0 right-0 w-full md:max-w-lg md:mx-auto md:bottom-6 md:rounded-2xl md:border md:border-slate-700/70 z-40 px-6 pt-2 pb-6 md:pb-2.5 select-none shadow-2xl transition-all"
      data-purpose="docked-navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {/* Item 1: Beranda */}
        <button
          onClick={() => onTabChange('beranda')}
          className={`flex flex-col items-center relative py-1 transition-all group cursor-pointer ${
            activeTab === 'beranda' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Beranda"
        >
          {activeTab === 'beranda' && (
            <span className="absolute -top-2.5 w-10 h-1 bg-cyan-400 rounded-full glow-home-indicator animate-in fade-in duration-200" />
          )}
          <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className={`text-xs mt-1 ${activeTab === 'beranda' ? 'font-bold text-white' : 'font-medium'}`}>
            Beranda
          </span>
        </button>

        {/* Item 2: Peta */}
        <button
          onClick={() => onTabChange('peta')}
          className={`flex flex-col items-center relative py-1 transition-all group cursor-pointer ${
            activeTab === 'peta' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Peta Geoportal"
        >
          {activeTab === 'peta' && (
            <span className="absolute -top-2.5 w-10 h-1 bg-cyan-400 rounded-full glow-home-indicator animate-in fade-in duration-200" />
          )}
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className={`text-xs mt-1 ${activeTab === 'peta' ? 'font-bold text-white' : 'font-medium'}`}>
            Peta
          </span>
        </button>

        {/* Item 3: Layanan */}
        <button
          onClick={() => onTabChange('layanan')}
          className={`flex flex-col items-center relative py-1 transition-all group cursor-pointer ${
            activeTab === 'layanan' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Katalog Layanan"
        >
          {activeTab === 'layanan' && (
            <span className="absolute -top-2.5 w-10 h-1 bg-cyan-400 rounded-full glow-home-indicator animate-in fade-in duration-200" />
          )}
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className={`text-xs mt-1 ${activeTab === 'layanan' ? 'font-bold text-white' : 'font-medium'}`}>
            Layanan
          </span>
        </button>

        {/* Item 4: Lapor */}
        <button
          onClick={() => onTabChange('lapor')}
          className={`flex flex-col items-center relative py-1 transition-all group cursor-pointer ${
            activeTab === 'lapor' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Lapor Pengaduan"
        >
          {activeTab === 'lapor' && (
            <span className="absolute -top-2.5 w-10 h-1 bg-cyan-400 rounded-full glow-home-indicator animate-in fade-in duration-200" />
          )}
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className={`text-xs mt-1 ${activeTab === 'lapor' ? 'font-bold text-white' : 'font-medium'}`}>
            Lapor
          </span>
        </button>
      </div>
    </nav>
  );
};
