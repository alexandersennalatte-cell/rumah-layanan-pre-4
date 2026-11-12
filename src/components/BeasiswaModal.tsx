import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle, Award, FileUp, Download } from 'lucide-react';
import { KECAMATAN_LIST } from '../data/portalData';

interface BeasiswaModalProps {
  onClose: () => void;
}

export const BeasiswaModal: React.FC<BeasiswaModalProps> = ({ onClose }) => {
  const [beasiswaType, setBeasiswaType] = useState('s1-prestasi');
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [kampus, setKampus] = useState('');
  const [ipk, setIpk] = useState('3.65');
  const [kecamatan, setKecamatan] = useState('Lamongan');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regNumber, setRegNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `GMPR-LMG-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegNumber(code);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-900/70 border border-purple-400/50 flex items-center justify-center text-purple-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Beasiswa Lamongan Gempur</h3>
              <p className="text-xs text-purple-300">Pemerintah Kabupaten Lamongan Menuju Kejayaan</p>
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
          {isSubmitted ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-950 border border-purple-400/60 flex items-center justify-center mx-auto text-purple-300 shadow-xl">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">Pendaftaran Berhasil Dikirim!</h4>
                <p className="text-sm text-purple-300 font-mono mt-1 font-bold">
                  No. Registrasi: {regNumber}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  Berkas Anda sedang diverifikasi oleh Tim Seleksi Beasiswa Dinas Pendidikan & Bagian Kesra Setda Lamongan.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-left text-xs sm:text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Pemohon:</span>
                  <span className="text-white font-medium">{nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kampus / Sekolah:</span>
                  <span className="text-white font-medium">{kampus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kecamatan Asal:</span>
                  <span className="text-white font-medium">{kecamatan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tahapan Selanjutnya:</span>
                  <span className="text-teal-400 font-medium">Uji Berkas & Wawancara</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => alert(`Tanda Terima Beasiswa ${regNumber} telah diunduh!`)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-purple-300" />
                  <span>Unduh Tanda Terima</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Program Selection */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-300 block mb-1.5">
                  Pilih Kategori Program Beasiswa
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setBeasiswaType('s1-prestasi')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      beasiswaType === 's1-prestasi'
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    <p className="font-bold text-xs sm:text-sm">S1/D4 Prestasi</p>
                    <p className="text-xs text-slate-400 mt-0.5">PTN/PTS seluruh Indonesia</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBeasiswaType('kedokteran')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      beasiswaType === 'kedokteran'
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    <p className="font-bold text-xs sm:text-sm">Kedokteran</p>
                    <p className="text-xs text-slate-400 mt-0.5">Fakultas Kedokteran Mitra</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBeasiswaType('santri')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      beasiswaType === 'santri'
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    <p className="font-bold text-xs sm:text-sm">Santri & Hafidz</p>
                    <p className="text-xs text-slate-400 mt-0.5">Penghafal Al-Qur'an 30 Juz</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBeasiswaType('prasejahtera')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      beasiswaType === 'prasejahtera'
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}
                  >
                    <p className="font-bold text-xs sm:text-sm">Gempur Prasejahtera</p>
                    <p className="text-xs text-slate-400 mt-0.5">Terdaftar DTKS Lamongan</p>
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nama Lengkap Mahasiswa / Siswa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Pemohon"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    NIK KTP Lamongan
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="16 Digit NIK"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Kecamatan Asal
                  </label>
                  <select
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  >
                    {KECAMATAN_LIST.filter((k) => k !== 'Semua Kecamatan').map((kec) => (
                      <option key={kec} value={kec}>
                        {kec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nama Perguruan Tinggi / Sekolah
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Universitas Airlangga / Unisla"
                    value={kampus}
                    onChange={(e) => setKampus(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    IPK / Rata Nilai
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 3.75"
                    value={ipk}
                    onChange={(e) => setIpk(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
              </div>

              {/* Upload simulation */}
              <div className="p-3 border border-dashed border-purple-500/40 rounded-xl bg-purple-950/20 text-center text-xs">
                <FileUp className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <span className="text-slate-200 font-medium block text-xs sm:text-sm">
                  Unggah Transkrip & Surat Keterangan Aktif
                </span>
                <span className="text-xs text-slate-400">Format PDF/JPG, Maksimal 5MB</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-98"
              >
                Kirim Formulir Beasiswa Gempur
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
