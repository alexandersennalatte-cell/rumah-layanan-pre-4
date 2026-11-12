import React from 'react';
import { Calendar, FileCheck, ArrowRight } from 'lucide-react';

interface QuickActionsProps {
  onOpenKtpModal: () => void;
  onOpenBeasiswaModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenMppQueue: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenKtpModal,
  onOpenBeasiswaModal,
  onOpenTrackingModal,
  onOpenMppQueue,
}) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mb-4 max-w-7xl mx-auto">
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5" data-purpose="quick-actions">
        {/* Card 1: Layanan KTP Digital */}
        <div
          onClick={onOpenKtpModal}
          className="glass-card rounded-2xl p-4 flex items-center space-x-3.5 cursor-pointer hover:border-cyan-400/60 hover:bg-slate-800/60 transition-all duration-200 active:scale-98 group shadow-lg"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-900/60 border border-teal-400/40 flex items-center justify-center flex-shrink-0 text-cyan-300 shadow-inner group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect height="16" rx="2" strokeWidth="2" width="18" x="3" y="4" />
              <path d="M7 8h4m-4 4h4m6-4v8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-slate-100 leading-tight group-hover:text-cyan-200 transition-colors">
              Layanan KTP Digital
            </span>
            <span className="text-xs text-teal-400 mt-1 flex items-center gap-1 font-semibold">
              <span>Aktivasi IKD Online</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 2: Beasiswa Lamongan Gempur */}
        <div
          onClick={onOpenBeasiswaModal}
          className="glass-card rounded-2xl p-4 flex items-center space-x-3.5 cursor-pointer hover:border-cyan-400/60 hover:bg-slate-800/60 transition-all duration-200 active:scale-98 group shadow-lg"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-900/60 border border-teal-400/40 flex items-center justify-center flex-shrink-0 text-cyan-300 shadow-inner group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-slate-100 leading-tight group-hover:text-cyan-200 transition-colors">
              Beasiswa Gempur
            </span>
            <span className="text-xs text-teal-400 mt-1 flex items-center gap-1 font-semibold">
              <span>Daftar Seleksi Perintis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 3: Antrean MPP Lamongan */}
        <div
          onClick={onOpenMppQueue}
          className="glass-card rounded-2xl p-4 flex items-center space-x-3.5 cursor-pointer hover:border-cyan-400/60 hover:bg-slate-800/60 transition-all duration-200 active:scale-98 group shadow-lg"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-cyan-300 shadow-inner group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-slate-100 leading-tight group-hover:text-cyan-200 transition-colors">
              Antrean MPP Lamongan
            </span>
            <span className="text-xs text-cyan-400 mt-1 flex items-center gap-1 font-semibold">
              <span>Ambil Nomor Loket</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 4: Cek Status Berkas */}
        <div
          onClick={onOpenTrackingModal}
          className="glass-card rounded-2xl p-4 flex items-center space-x-3.5 cursor-pointer hover:border-cyan-400/60 hover:bg-slate-800/60 transition-all duration-200 active:scale-98 group shadow-lg"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-emerald-300 shadow-inner group-hover:scale-110 transition-transform">
            <FileCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-slate-100 leading-tight group-hover:text-cyan-200 transition-colors">
              Cek Status Berkas
            </span>
            <span className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <span>Lacak Tiket Online</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
