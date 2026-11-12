import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LIFECYCLE_STAGES } from '../data/portalData';
import { LifecycleStage } from '../types';

interface CitizenLifecycleProps {
  activeStage: LifecycleStage;
  onSelectStage: (stage: LifecycleStage) => void;
}

export const CitizenLifecycle: React.FC<CitizenLifecycleProps> = ({
  activeStage,
  onSelectStage,
}) => {
  const currentIndex = LIFECYCLE_STAGES.findIndex((s) => s.id === activeStage);

  const handlePrev = () => {
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : LIFECYCLE_STAGES.length - 1;
    onSelectStage(LIFECYCLE_STAGES[nextIndex].id);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < LIFECYCLE_STAGES.length - 1 ? currentIndex + 1 : 0;
    onSelectStage(LIFECYCLE_STAGES[nextIndex].id);
  };

  const renderStageIcon = (stageId: string, isActive: boolean) => {
    if (stageId === 'kelahiran') {
      return (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2a4 4 0 00-4 4v1h8V6a4 4 0 00-4-4zM8 7v13a2 2 0 002 2h4a2 2 0 002-2V7H8z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="13" fill="currentColor" r="2" />
        </svg>
      );
    }
    if (stageId === 'sekolah') {
      return (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    }
    if (stageId === 'ktp-kuliah') {
      return (
        <svg
          className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-white' : 'text-teal-300'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    }
    if (stageId === 'kerja') {
      return (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="2.5" />
        <path d="M10 10v6l-2 4m5-10v5l3 5m-1-10v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <section
      className="w-full -mt-24 mb-4 px-4 sm:px-6 lg:px-8 relative z-30 pt-2 pb-1 rounded-2xl select-none"
      data-purpose="siklus-hidup-warga"
      style={{
        background:
          'linear-gradient(180deg, rgba(3, 8, 17, 0) 0%, rgba(3, 8, 17, 0.7) 25%, rgba(3, 8, 17, 0.98) 100%)',
      }}
    >
      <div className="max-w-4xl lg:max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <div className="px-2 mb-3 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold tracking-wider text-slate-100 uppercase flex items-center gap-2">
            <span>SIKLUS HIDUP WARGA</span>
            <span className="text-xs font-semibold text-cyan-400 lowercase tracking-normal bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              {LIFECYCLE_STAGES.find((s) => s.id === activeStage)?.subtext}
            </span>
          </h2>
          <span className="text-xs text-slate-400">Pilih Tahapan Kehidupan</span>
        </div>

        {/* Stepper / Stage Carousel - Fixed Grid Layout */}
        <div className="relative w-full flex items-center justify-between gap-1 sm:gap-2 px-0.5">
          {/* Left Caret */}
          <button
            onClick={handlePrev}
            aria-label="Tahap Sebelumnya"
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800/60 active:scale-90 z-20 flex-shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Stepper Elements Container */}
          <div className="flex-1 relative">
            {/* Horizontal Timeline Line Behind Nodes */}
            <div className="absolute left-[10%] right-[10%] top-[26px] sm:top-[30px] -translate-y-1/2 h-[2px] bg-slate-700/60 pointer-events-none z-0">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 transition-all duration-300"
                style={{
                  width: `${(currentIndex / (LIFECYCLE_STAGES.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* 5 Equal Columns Grid */}
            <div className="grid grid-cols-5 w-full items-start relative z-10">
              {LIFECYCLE_STAGES.map((stage) => {
                const isActive = stage.id === activeStage;

                return (
                  <div
                    key={stage.id}
                    onClick={() => onSelectStage(stage.id)}
                    className="col-span-1 flex flex-col items-center justify-start cursor-pointer group focus:outline-none"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`Tahap ${stage.label}`}
                  >
                    <div
                      className={`w-full max-w-[70px] sm:max-w-[88px] pt-1.5 pb-2 px-1 sm:px-2 rounded-[22px] flex flex-col items-center transition-all duration-200 ${
                        isActive
                          ? 'glow-active-pill text-white -translate-y-1 shadow-2xl z-20'
                          : 'bg-transparent text-slate-300 hover:text-white hover:-translate-y-0.5 z-10'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isActive
                            ? 'bg-indigo-600/50 border border-indigo-300/70 text-white shadow-inner scale-105'
                            : 'bg-[#122e37] border border-teal-500/50 text-teal-300 shadow-md group-hover:border-cyan-300 group-hover:text-cyan-200 group-hover:scale-105'
                        }`}
                      >
                        {renderStageIcon(stage.id, isActive)}
                      </div>

                      <div className="h-7 sm:h-8 flex items-center justify-center mt-1 w-full px-0.5">
                        <span
                          className={`text-xs sm:text-sm text-center leading-tight transition-colors line-clamp-2 ${
                            isActive
                              ? 'font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                              : 'font-semibold text-slate-300 group-hover:text-white'
                          }`}
                        >
                          {stage.label.includes('&') ? (
                            <>
                              {stage.label.split('&')[0]}&amp;
                              <br />
                              {stage.label.split('&')[1]}
                            </>
                          ) : (
                            stage.label
                          )}
                        </span>
                      </div>

                      <div className="h-4 sm:h-4.5 flex items-center justify-center mt-0.5">
                        {isActive ? (
                          <span className="text-[11px] sm:text-xs font-bold bg-indigo-950/90 text-indigo-200 border border-indigo-400/50 rounded-full px-2 py-0.5 shadow-inner uppercase tracking-wider animate-in fade-in duration-150">
                            Aktif
                          </span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/60 group-hover:bg-cyan-500/60 transition-colors" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Caret */}
          <button
            onClick={handleNext}
            aria-label="Tahap Berikutnya"
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800/60 active:scale-90 z-20 flex-shrink-0 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
