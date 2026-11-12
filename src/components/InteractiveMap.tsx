import React, { useState } from 'react';
import { Crosshair, CheckCircle2 } from 'lucide-react';
import { MapPin, ServiceItem } from '../types';

interface InteractiveMapProps {
  pins: MapPin[];
  onSelectPin: (pin: MapPin) => void;
  allServices: ServiceItem[];
  selectedCategoryFilter?: string;
  activeLifecycle?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pins,
  onSelectPin,
}) => {
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [gpsNotification, setGpsNotification] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'ktp' | 'beasiswa'>('all');

  const handleCrosshairClick = () => {
    setGpsNotification('GPS Aktif: Terhubung ke MPP Jl. Basuki Rahmat, Lamongan Kota (Jarak 1.4 km)');
    setTimeout(() => {
      setGpsNotification(null);
    }, 4500);
  };

  const displayedPins = pins.filter((pin) => {
    if (filterType === 'all') return true;
    return pin.iconType === filterType;
  });

  return (
    <section
      className="relative w-full h-[600px] sm:h-[680px] md:h-[780px] lg:h-[84vh] min-h-[580px] flex items-center justify-center overflow-visible select-none"
      data-purpose="geospatial-map"
    >
      <div className="relative w-full h-full overflow-visible">
        {/* Target/Crosshair Button on Top Right */}
        <button
          onClick={handleCrosshairClick}
          aria-label="Target Lokasi Anda"
          title="Deteksi Lokasi Terdekat"
          className="absolute top-4 right-4 sm:right-6 lg:right-8 z-30 w-11 h-11 rounded-full bg-slate-900/85 border border-slate-700/80 shadow-lg flex items-center justify-center text-rose-500 backdrop-blur-md active:scale-95 hover:border-rose-500/60 hover:text-rose-400 transition-all group cursor-pointer"
        >
          <Crosshair className="w-6 h-6 group-hover:rotate-45 transition-transform" />
        </button>

        {/* Map Filter Badges (Top Left) */}
        <div className="absolute top-4 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-1.5 backdrop-blur-md bg-slate-900/85 p-1 rounded-xl border border-slate-700/60 text-xs shadow-lg">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterType === 'all'
                ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua Titik
          </button>
          <button
            onClick={() => setFilterType('ktp')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterType === 'ktp'
                ? 'bg-teal-500/25 text-teal-300 border border-teal-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            KTP Online
          </button>
          <button
            onClick={() => setFilterType('beasiswa')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterType === 'beasiswa'
                ? 'bg-purple-500/25 text-purple-300 border border-purple-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Beasiswa Gempur
          </button>
        </div>

        {/* GPS Notification Toast */}
        {gpsNotification && (
          <div className="absolute top-16 left-4 right-4 z-40 mx-auto max-w-md bg-slate-950/95 border border-rose-500/50 rounded-xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-xs text-rose-200 animate-in fade-in slide-in-from-top duration-300">
            <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="flex-1 font-medium leading-relaxed">{gpsNotification}</span>
          </div>
        )}

        {/* Territory Map Backdrop Image with Gradients */}
        <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA78O7Lpac8S0SGEz-OhIeMqJaTDsro-RiXFubLAYHf5ldo3Dw4zIHM3LBk4K8vSzYh_1k9GvrhGKwfJ68ZTJEzN08JbefCU48xX_Fu22U9mrsfY8APwoZrqm2wwxeP33a5fK0TbtVN-pGd86EMSTmyVou6tVdS67nDKJOgbWcC9t6Io_e1WxjgDgnF0ciD-gkNswWL_2jkIT04WZeGd9lqnecqKpVJnByCcimTLGd0LYAp-umq-Ts4"
            alt="Peta Lamongan"
            className="w-full h-full object-cover object-center drop-shadow-md opacity-90 transition-opacity"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(transparent 55%, rgba(3, 8, 17, 0.65) 75%, rgba(3, 8, 17, 0.98) 100%)',
            }}
          />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </div>

        {/* Geospatial Pins */}
        {displayedPins.map((pin) => {
          const isHovered = activePinId === pin.id;

          const renderIcon = () => {
            if (pin.iconType === 'beasiswa') {
              return (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              );
            }
            if (pin.glowType === 'purple') {
              return (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect height="16" rx="2" strokeWidth="2" width="18" x="3" y="4" />
                  <path d="M7 8h4m-4 4h4m6-4v8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              );
            }
            if (pin.glowType === 'blue') {
              return (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect height="16" rx="2" strokeWidth="2" width="18" x="3" y="4" />
                  <path d="M7 8h4m-4 4h4m6-4v8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              );
            }
            return (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            );
          };

          const getBadgeStyle = () => {
            if (pin.glowType === 'purple') {
              return 'bg-[#3c1e70] border border-[#9333ea] glow-purple-badge';
            }
            if (pin.glowType === 'blue') {
              return 'bg-[#1b3d68] border border-[#38bdf8] shadow-[0_0_18px_2px_rgba(56,189,248,0.5)]';
            }
            return 'bg-[#114b43] border border-[#00f2c3] glow-cyan-badge';
          };

          return (
            <div
              key={pin.id}
              onClick={() => onSelectPin(pin)}
              onMouseEnter={() => setActivePinId(pin.id)}
              onMouseLeave={() => setActivePinId(null)}
              className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer group z-20"
              style={{
                top: `${pin.y}%`,
                left: `${pin.x}%`,
              }}
            >
              {/* Outer Pulsing Ring */}
              <div
                className={`absolute -inset-1.5 rounded-full opacity-60 pin-ring-anim pointer-events-none ${
                  pin.glowType === 'purple'
                    ? 'bg-purple-500'
                    : pin.glowType === 'blue'
                    ? 'bg-sky-500'
                    : 'bg-emerald-400'
                }`}
              />

              {/* Pin Badge Circle */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-115 relative z-10 ${getBadgeStyle()}`}
              >
                {renderIcon()}
              </div>

              {/* Label Under Pin */}
              <span className="text-xs sm:text-sm font-semibold text-slate-100 mt-1 text-center whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] leading-tight tracking-tight group-hover:text-cyan-300 transition-colors">
                {pin.title.split(' ')[0]}
                <br />
                {pin.title.split(' ').slice(1).join(' ')}
              </span>

              {/* Hover Tooltip Card */}
              {isHovered && (
                <div className="absolute bottom-full mb-3 px-3 py-2 bg-slate-950/95 border border-cyan-400/50 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150">
                  <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    {pin.title}
                  </p>
                  <p className="text-xs text-cyan-200 mt-0.5">{pin.subtitle}</p>
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-1 font-medium">
                    <span>Ketuk untuk ajukan permohonan</span>
                    <span className="text-cyan-400">→</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Official Map Legend / Watermark */}
        <div className="absolute bottom-28 right-4 sm:right-6 lg:right-8 pointer-events-none opacity-80 text-right z-10">
          <span className="text-xs uppercase tracking-wider text-slate-300 block font-bold">
            Kabupaten Lamongan
          </span>
          <span className="text-xs text-slate-400">27 Kecamatan • Geoportal Resmi</span>
        </div>
      </div>
    </section>
  );
};
