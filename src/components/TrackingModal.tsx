import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';

interface TrackingModalProps {
  onClose: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ onClose }) => {
  const [ticketInput, setTicketInput] = useState('LMG-2026-8849');
  const [searchResult, setSearchResult] = useState<any>({
    ticket: 'LMG-2026-8849',
    layanan: 'Penerbitan KTP-el & Aktivasi IKD Digital',
    opd: 'Disdukcapil Kabupaten Lamongan',
    pemohon: 'Bagus Prasetyo',
    tanggal: '06 November 2026',
    status: 'Selesai & Siap Diunduh',
    steps: [
      { label: 'Pendaftaran Online', done: true, time: '08:30 WIB' },
      { label: 'Verifikasi Berkas SIAK', done: true, time: '09:45 WIB' },
      { label: 'Validasi & Tanda Tangan Elektronik', done: true, time: '11:15 WIB' },
      { label: 'Dokumen / IKD Aktif', done: true, time: '11:30 WIB' },
    ],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    setSearchResult({
      ticket: ticketInput.toUpperCase(),
      layanan: ticketInput.startsWith('LPR')
        ? 'Laporan Pengaduan Warga'
        : ticketInput.startsWith('GMPR')
        ? 'Pendaftaran Beasiswa Lamongan Gempur'
        : 'Permohonan Layanan Kependudukan',
      opd: 'Pemerintah Kabupaten Lamongan',
      pemohon: 'Warga Terdaftar',
      tanggal: '06 November 2026',
      status: 'Sedang Diverifikasi Petugas',
      steps: [
        { label: 'Pengajuan Masuk', done: true, time: 'Hari Ini' },
        { label: 'Pemeriksaan Persyaratan', done: true, time: 'Sedang Berjalan' },
        { label: 'Persetujuan Pejabat Berwenang', done: false, time: 'Menunggu' },
        { label: 'Penerbitan Dokumen Resmi', done: false, time: 'Menunggu' },
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-900/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Lacak Status Berkas &amp; Tiket</h3>
              <p className="text-xs text-cyan-300">Sistem Informasi Pelayanan Terpadu Lamongan</p>
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
        <div className="p-5 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Masukkan nomor tiket..."
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Cek</span>
            </button>
          </form>

          {/* Result Card */}
          {searchResult && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3.5">
              <div className="flex items-start justify-between border-b border-slate-700/80 pb-2.5">
                <div>
                  <span className="text-xs sm:text-sm font-mono text-cyan-300 font-bold block">
                    {searchResult.ticket}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">{searchResult.layanan}</h4>
                  <p className="text-xs text-slate-400">{searchResult.opd}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold whitespace-nowrap">
                  {searchResult.status}
                </span>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                {searchResult.steps.map((st: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 relative z-10">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        st.done ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 border border-slate-600'
                      }`}
                    >
                      {st.done ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className={`text-xs sm:text-sm ${st.done ? 'text-white font-medium' : 'text-slate-500'}`}>
                        {st.label}
                      </span>
                      <span className="text-xs text-slate-400">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center pt-1">
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
