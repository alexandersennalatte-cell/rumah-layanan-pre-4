import React, { useState } from 'react';
import { X, Calendar, Ticket, Clock, CheckCircle2, QrCode } from 'lucide-react';

interface MppQueueModalProps {
  onClose: () => void;
}

export const MppQueueModal: React.FC<MppQueueModalProps> = ({ onClose }) => {
  const [instansi, setInstansi] = useState('Disdukcapil');
  const [layanan, setLayanan] = useState('Perekaman KTP-el & IKD');
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [jamSlot, setJamSlot] = useState('09.00 - 10.00 WIB');
  const [bookedNumber, setBookedNumber] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = instansi === 'Disdukcapil' ? 'A' : instansi === 'DPMPTSP' ? 'B' : 'C';
    const queueNum = `${prefix}-${Math.floor(10 + Math.random() * 80)}`;
    setBookedNumber(queueNum);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-900/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Antrean Online MPP Lamongan</h3>
              <p className="text-xs text-cyan-300">Gedung Mal Pelayanan Publik Jl. Basuki Rahmat</p>
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
        <div className="p-5 overflow-y-auto">
          {bookedNumber ? (
            <div className="py-2 text-center space-y-4">
              <div className="bg-gradient-to-tr from-cyan-950 to-blue-900 border border-cyan-400/50 rounded-2xl p-4 shadow-xl text-white space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-200">
                  NOMOR ANTREAN ANDA
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-wider text-cyan-300 font-mono py-1">
                  {bookedNumber}
                </div>
                <div className="text-xs sm:text-sm text-slate-200 border-t border-cyan-500/20 pt-2 flex items-center justify-between">
                  <span>Loket: {instansi}</span>
                  <span>Slot: {jamSlot}</span>
                </div>
              </div>

              <div className="flex justify-center p-2 bg-white rounded-xl w-32 h-32 mx-auto items-center">
                <QrCode className="w-28 h-28 text-slate-950" />
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-1">
                <p className="font-semibold text-white">Harap hadir 15 menit sebelum slot waktu</p>
                <p className="text-xs text-slate-400">
                  Scan QR code ini di mesin tiket MPP untuk mencetak struk fisik.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Selesai &amp; Simpan Tiket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Instansi / Gerai Layanan</label>
                <select
                  value={instansi}
                  onChange={(e) => setInstansi(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Disdukcapil">Disdukcapil (KTP, KIA, Akta Lahir)</option>
                  <option value="DPMPTSP">DPMPTSP (Perizinan Usaha, Reklame)</option>
                  <option value="Bapenda">Bapenda (PBB-P2, BPHTB)</option>
                  <option value="BPJS Kesehatan">BPJS Kesehatan (PBI & Mandiri)</option>
                  <option value="Samsat Lamongan">Samsat (Pajak Kendaraan Bermotor)</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Pilihan Jam Kedatangan</label>
                <select
                  value={jamSlot}
                  onChange={(e) => setJamSlot(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="08.00 - 09.00 WIB">08.00 - 09.00 WIB (Sisa kuota: 8)</option>
                  <option value="09.00 - 10.00 WIB">09.00 - 10.00 WIB (Sisa kuota: 12)</option>
                  <option value="10.00 - 11.00 WIB">10.00 - 11.00 WIB (Sisa kuota: 5)</option>
                  <option value="13.00 - 14.00 WIB">13.00 - 14.00 WIB (Sisa kuota: 14)</option>
                </select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">NIK Pemohon</label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  placeholder="16 Digit NIK KTP"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Nama Pemohon</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>Ambil Nomor Antrean Sekarang</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
