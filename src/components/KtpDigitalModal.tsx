import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, Smartphone, Check, Fingerprint, Camera, Download } from 'lucide-react';
import { KECAMATAN_LIST } from '../data/portalData';

interface KtpDigitalModalProps {
  onClose: () => void;
}

export const KtpDigitalModal: React.FC<KtpDigitalModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    nik: '3524012005020001',
    nama: 'Bagus Prasetyo',
    kk: '3524012010150002',
    phone: '081234567890',
    kecamatan: 'Lamongan',
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 2000);
  };

  const handleFinishBiometric = () => {
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 bg-gradient-to-r from-teal-950 via-slate-900 to-blue-950 border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-900/80 border border-teal-400/50 flex items-center justify-center text-teal-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Aktivasi KTP Digital (IKD)</h3>
              <p className="text-xs text-teal-300">Disdukcapil Kabupaten Lamongan</p>
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

        {/* Stepper Indicator */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-teal-400 font-bold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-teal-500/20 border border-teal-400 text-teal-300' : 'bg-slate-800'}`}>
              1
            </span>
            <span>Data Warga</span>
          </div>
          <div className="h-0.5 w-6 bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-teal-400 font-bold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-teal-500/20 border border-teal-400 text-teal-300' : 'bg-slate-800'}`}>
              2
            </span>
            <span>Biometrik</span>
          </div>
          <div className="h-0.5 w-6 bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-teal-400 font-bold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-teal-500/20 border border-teal-400 text-teal-300' : 'bg-slate-800'}`}>
              3
            </span>
            <span>KTP Digital</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto">
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-3.5">
              <div className="bg-teal-950/40 border border-teal-500/30 p-3.5 rounded-xl text-xs sm:text-sm text-teal-200">
                Layanan aktivasi Identitas Kependudukan Digital resmi Kabupaten Lamongan langsung terkoneksi ke SIAK Terpusat Kemendagri.
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nama Lengkap Sesuai KK
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    No. Kartu Keluarga
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.kk}
                    onChange={(e) => setFormData({ ...formData, kk: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Kecamatan Domisili
                  </label>
                  <select
                    value={formData.kecamatan}
                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400"
                  >
                    {KECAMATAN_LIST.filter((k) => k !== 'Semua Kecamatan').map((kec) => (
                      <option key={kec} value={kec}>
                        {kec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nomor WhatsApp untuk Kode OTP
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lanjut Verifikasi Biometrik</span>
                <span>→</span>
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="py-4 text-center space-y-4">
              <div className="relative w-44 h-44 mx-auto rounded-3xl border-2 border-dashed border-teal-400/60 bg-slate-950 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                {isVerifying ? (
                  <div className="space-y-2">
                    <Fingerprint className="w-16 h-16 text-teal-400 animate-pulse mx-auto" />
                    <div className="h-0.5 w-32 bg-teal-400/80 animate-bounce mx-auto" />
                    <p className="text-xs text-teal-300 font-medium">Mencocokkan Biometrik SIAK...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="w-12 h-12 text-slate-400 mx-auto" />
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">Posisikan Wajah di Depan Kamera</p>
                    <span className="text-xs text-teal-400 block font-medium">Kamera aktif untuk verifikasi liveness</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 text-left text-xs sm:text-sm">
                <p className="text-slate-300 font-semibold mb-1">Status Verifikasi:</p>
                <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-medium">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>NIK {formData.nik} terdaftar di Disdukcapil Kab. Lamongan</span>
                </div>
              </div>

              <button
                onClick={handleFinishBiometric}
                disabled={isVerifying}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-400 hover:opacity-95 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                {isVerifying ? 'Sedang Memproses...' : 'Terbitkan KTP Digital Sekarang'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 py-1">
              {/* Virtual KTP Card Preview */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-tr from-sky-900 via-blue-900 to-indigo-950 border border-cyan-400/60 shadow-2xl text-white overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
                  <div className="text-left">
                    <p className="text-[11px] tracking-widest uppercase font-bold text-cyan-200">
                      PROVINSI JAWA TIMUR
                    </p>
                    <p className="text-xs sm:text-sm tracking-wider uppercase font-extrabold text-white">
                      KABUPATEN LAMONGAN
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 px-2.5 py-0.5 rounded-full font-bold">
                      IKD AKTIF
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 text-left">
                  <div className="space-y-1.5 flex-1">
                    <div>
                      <span className="text-[11px] text-slate-300 block font-semibold">NIK</span>
                      <span className="text-sm font-mono font-bold tracking-wider text-cyan-300">
                        {formData.nik}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-300 block font-semibold">Nama</span>
                      <span className="text-sm font-bold text-white uppercase">{formData.nama}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-300 block font-semibold">Kecamatan</span>
                        <span className="font-medium text-slate-100">{formData.kecamatan}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-300 block font-semibold">Masa Berlaku</span>
                        <span className="font-medium text-slate-100">SEUMUR HIDUP</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="w-20 h-20 bg-white p-1 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <QrCode className="w-16 h-16 text-slate-950" />
                  </div>
                </div>
              </div>

              {/* Success Info & Instructions */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 text-xs sm:text-sm text-emerald-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Aktivasi KTP Digital Berhasil!</span>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Data kependudukan Anda kini tersimpan dalam aplikasi IKD resmi. Anda dapat menggunakan QR Code ini di MPP Lamongan, Puskesmas, dan kantor instansi.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Bukti KTP Digital untuk NIK ${formData.nik} berhasil disimpan!`)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Simpan Kartu</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
