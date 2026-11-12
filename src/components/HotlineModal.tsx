import React from 'react';
import { X, PhoneCall, ShieldAlert, HeartPulse, Flame, Radio } from 'lucide-react';

interface HotlineModalProps {
  onClose: () => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({ onClose }) => {
  const hotlines = [
    {
      name: 'Call Center Darurat Lamongan 112',
      number: '112',
      desc: 'Layanan terintegrasi bebas pulsa (Ambulans, Kebakaran, Medis, Kecelakaan, Banjir)',
      icon: PhoneCall,
      color: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
    },
    {
      name: 'IGD RSUD dr. Soegiri Lamongan',
      number: '(0322) 321718',
      desc: 'Instalasi Gawat Darurat Medis 24 Jam Rujukan Utama',
      icon: HeartPulse,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    },
    {
      name: 'Pemadam Kebakaran & Penyelamatan',
      number: '(0322) 321113',
      desc: 'Penanganan kebakaran & animal rescue evakuasi reptil/sarang lebah',
      icon: Flame,
      color: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
    },
    {
      name: 'BPBD Kabupaten Lamongan',
      number: '(0322) 311222',
      desc: 'Posko Siaga Bencana Banjir Bengawan Solo & Angin Kencang',
      icon: Radio,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40',
    },
    {
      name: 'Polres Lamongan (SPKT)',
      number: '110 / (0322) 321110',
      desc: 'Layanan respon cepat kepolisian & keamanan ketertiban masyarakat',
      icon: ShieldAlert,
      color: 'text-blue-400 bg-blue-950/60 border-blue-500/40',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-red-950 via-slate-900 to-rose-950 border-b border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-900/60 border border-rose-400/40 flex items-center justify-center text-rose-300">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Nomor Darurat &amp; Hotline Lamongan</h3>
              <p className="text-xs text-rose-300">Siaga 24 Jam Bebas Pulsa &amp; Cepat Tanggap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[80vh]">
          {hotlines.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between gap-3 hover:border-rose-400/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${h.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{h.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">{h.desc}</p>
                    <span className="text-sm font-mono font-bold text-rose-400 mt-1 block">
                      {h.number}
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl flex-shrink-0 transition-colors shadow-md"
                >
                  Panggil
                </a>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
