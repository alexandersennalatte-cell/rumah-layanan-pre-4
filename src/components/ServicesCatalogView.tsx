import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Layers } from 'lucide-react';
import { ServiceItem, LifecycleStage } from '../types';
import { SERVICES_DATA, LIFECYCLE_STAGES } from '../data/portalData';

interface ServicesCatalogViewProps {
  onSelectService: (service: ServiceItem) => void;
  initialLifecycle?: LifecycleStage;
}

export const ServicesCatalogView: React.FC<ServicesCatalogViewProps> = ({
  onSelectService,
  initialLifecycle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>(initialLifecycle || 'Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Kependudukan', 'Pendidikan', 'Perizinan', 'Kesehatan', 'Ketenagakerjaan', 'Sosial'];

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesCategory = selectedCategory === 'Semua' || s.category === selectedCategory;
    const matchesLifecycle = selectedLifecycle === 'Semua' || s.lifecycle === selectedLifecycle;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.opd.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLifecycle && matchesSearch;
  });

  return (
    <div className="w-full pb-32 px-4 sm:px-6 lg:px-8 pt-4 space-y-5 max-w-7xl mx-auto select-none">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 border border-cyan-500/30 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-900/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              KATALOG LAYANAN PUBLIK KABUPATEN LAMONGAN
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200 mt-0.5">
              Akses cepat seluruh layanan terpadu OPD &amp; Kantor Kecamatan se-Kabupaten Lamongan
            </p>
          </div>
        </div>
      </div>

      {/* Search Input & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari nama layanan, instansi, atau dokumen persyaratan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="overflow-x-auto pb-1 flex gap-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lifecycle Stage Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-xs uppercase font-bold mr-1 flex items-center gap-1.5 flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          Siklus Warga:
        </span>
        <button
          onClick={() => setSelectedLifecycle('Semua')}
          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            selectedLifecycle === 'Semua'
              ? 'bg-slate-700 text-white font-bold'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          Semua Tahap
        </button>
        {LIFECYCLE_STAGES.map((stg) => (
          <button
            key={stg.id}
            onClick={() => setSelectedLifecycle(stg.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              selectedLifecycle === stg.id
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {stg.label}
          </button>
        ))}
      </div>

      {/* Services List Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 px-1 pt-1">
        <span>Menampilkan <strong className="text-white">{filteredServices.length}</strong> layanan publik terpadu</span>
        <span className="text-emerald-400 font-semibold">100% Bebas Pungutan (Gratis)</span>
      </div>

      {/* Responsive Services Cards Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <p className="text-base font-semibold text-slate-300">Tidak ada layanan yang sesuai</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Coba ganti kata kunci pencarian atau reset filter kategori.
            </p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all hover:bg-slate-800/50 group flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {service.category}
                  </span>
                  {service.isOnline && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-semibold">
                      Online
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm text-slate-400">
                <span className="truncate max-w-[180px] sm:max-w-[200px]" title={service.opd}>
                  {service.opd}
                </span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Lihat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
