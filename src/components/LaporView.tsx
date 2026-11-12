import React, { useState } from 'react';
import { MessageSquareWarning, Send, CheckCircle2, Clock, AlertCircle, Search } from 'lucide-react';
import { ComplaintReport } from '../types';
import { KECAMATAN_LIST } from '../data/portalData';

const INITIAL_REPORTS: ComplaintReport[] = [
  {
    id: 'rep-1',
    ticketNumber: 'LPR-2026-0812',
    category: 'Infrastruktur Jalan',
    title: 'Perbaikan jalan berlubang ruas Babat - Sukodadi',
    description: 'Terdapat lubang jalan yang cukup dalam di dekat perlintasan kereta api Babat, membahayakan pengendara roda dua.',
    reporterName: 'Ahmad Fauzi',
    reporterPhone: '0812****882',
    kecamatan: 'Babat',
    status: 'Selesai',
    date: 'Kemarin, 14:20 WIB',
  },
  {
    id: 'rep-2',
    ticketNumber: 'LPR-2026-0815',
    category: 'Penerangan Jalan (PJU)',
    title: 'Lampu PJU mati di jalan poros Brondong - Paciran',
    description: 'Lampu penerangan jalan umum mati sepanjang 200 meter di area pesisir Brondong, kondisi gelap saat malam.',
    reporterName: 'Siti Nurhaliza',
    reporterPhone: '0857****119',
    kecamatan: 'Brondong',
    status: 'Diproses OPD',
    date: 'Hari ini, 09:15 WIB',
  },
  {
    id: 'rep-3',
    ticketNumber: 'LPR-2026-0818',
    category: 'Saluran Irigasi / Banjir',
    title: 'Normalisasi sedimentasi enceng gondok kali Lamong',
    description: 'Mohon dinas terkait melakukan pembersihan saluran pembuangan sebelum musim penghujan tinggi.',
    reporterName: 'H. Sudarmanto',
    reporterPhone: '0821****445',
    kecamatan: 'Lamongan',
    status: 'Menunggu Verifikasi',
    date: 'Hari ini, 11:30 WIB',
  },
];

export const LaporView: React.FC = () => {
  const [reports, setReports] = useState<ComplaintReport[]>(INITIAL_REPORTS);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infrastruktur Jalan');
  const [kecamatan, setKecamatan] = useState('Lamongan');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [searchTicket, setSearchTicket] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = `LPR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: ComplaintReport = {
      id: `rep-${Date.now()}`,
      ticketNumber: newTicket,
      category,
      title,
      description,
      reporterName: isAnonymous ? 'Warga Rahasia (Anonim)' : reporterName || 'Warga Lamongan',
      reporterPhone: reporterPhone || '-',
      kecamatan,
      status: 'Menunggu Verifikasi',
      date: 'Baru saja',
    };

    setReports([newReport, ...reports]);
    setSubmittedTicket(newTicket);
    setTitle('');
    setDescription('');
  };

  const filteredReports = searchTicket.trim()
    ? reports.filter(
        (r) =>
          r.ticketNumber.toLowerCase().includes(searchTicket.toLowerCase()) ||
          r.title.toLowerCase().includes(searchTicket.toLowerCase()) ||
          r.kecamatan.toLowerCase().includes(searchTicket.toLowerCase())
      )
    : reports;

  return (
    <div className="w-full pb-32 px-4 sm:px-6 lg:px-8 pt-4 space-y-6 max-w-7xl mx-auto select-none">
      {/* Banner Lapor Mas Bupati */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-500/40 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-red-900/70 border border-red-400/50 flex items-center justify-center text-red-200 flex-shrink-0">
            <MessageSquareWarning className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              LAPOR MAS BUPATI LAMONGAN
            </h2>
            <p className="text-xs sm:text-sm text-red-200 mt-0.5">
              Kanal Aspirasi &amp; Pengaduan Publik Terintegrasi SP4N LAPOR! Pemerintah Kabupaten Lamongan
            </p>
          </div>
        </div>
      </div>

      {/* Submission Success Alert */}
      {submittedTicket && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-center space-y-2 animate-in zoom-in-95 max-w-2xl mx-auto shadow-2xl">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Laporan Anda Telah Terkirim!</h3>
          <p className="text-sm text-emerald-200 font-mono font-bold">
            Nomor Tiket: {submittedTicket}
          </p>
          <p className="text-xs text-slate-300">
            Laporan telah diteruskan ke OPD terkait di Pemerintah Kabupaten Lamongan. Pantau tindak lanjut secara berkala.
          </p>
          <button
            onClick={() => setSubmittedTicket(null)}
            className="text-xs text-cyan-400 hover:underline pt-1 block mx-auto cursor-pointer"
          >
            Tutup pemberitahuan
          </button>
        </div>
      )}

      {/* 2-Column Responsive Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Pengaduan */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-700/60 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
              <span>Tulis Laporan / Pengaduan Baru</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Kategori Pengaduan</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-400"
                  >
                    <option value="Infrastruktur Jalan">Infrastruktur Jalan &amp; Jembatan</option>
                    <option value="Penerangan Jalan (PJU)">Penerangan Jalan (PJU)</option>
                    <option value="Pelayanan Publik">Pelayanan Publik OPD / Kecamatan</option>
                    <option value="Saluran Irigasi / Banjir">Saluran Irigasi &amp; Banjir</option>
                    <option value="Kesehatan / RSUD">Kesehatan &amp; Fasilitas RSUD</option>
                    <option value="Bantuan Sosial">Bantuan Sosial &amp; Kemiskinan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Kecamatan Lokasi</label>
                  <select
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-400"
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
                <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Judul Laporan</label>
                <input
                  type="text"
                  required
                  placeholder="Ringkasan singkat masalah..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Deskripsi &amp; Kronologi Masalah</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Jelaskan detail lokasi, waktu, dan harapan perbaikan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Nama Pelapor</label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder="Nama Anda"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full bg-slate-900 disabled:opacity-50 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">No. WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-slate-700 text-red-500 focus:ring-0"
                  />
                  <span>Kirim sebagai Anonim (Rahasia)</span>
                </label>
                <span className="text-xs text-slate-400">Kerahasiaan dijamin undang-undang</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan Pengaduan</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Laporan Publik & Tracking */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Daftar Laporan Terkini
            </h3>
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                placeholder="Cari no. tiket atau kecamatan..."
                value={searchTicket}
                onChange={(e) => setSearchTicket(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => {
              const getStatusBadge = () => {
                if (report.status === 'Selesai') {
                  return (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selesai Ditindaklanjuti</span>
                    </span>
                  );
                }
                if (report.status === 'Diproses OPD') {
                  return (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Diproses Dinas Terkait</span>
                    </span>
                  );
                }
                return (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-950/90 text-blue-300 border border-blue-500/40 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Verifikasi Awal</span>
                  </span>
                );
              };

              return (
                <div
                  key={report.id}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-2 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300">
                      {report.ticketNumber}
                    </span>
                    {getStatusBadge()}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">{report.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>Kecamatan {report.kecamatan}</span>
                    <span>{report.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
