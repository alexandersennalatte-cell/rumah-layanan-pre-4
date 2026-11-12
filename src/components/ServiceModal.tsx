import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin as MapPinIcon, ShieldCheck, FileText, Send, Download } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenSpecificFlow?: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onOpenSpecificFlow,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [applicantName, setApplicantName] = useState('');
  const [applicantNik, setApplicantNik] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  if (!service) return null;

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantNik || !applicantName) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `LMG-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      setSubmissionSuccess(ticketId);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 pb-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                {service.category}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                100% Gratis
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">{service.title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{service.opd}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-300">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Estimasi Selesai</span>
                <span className="text-sm font-semibold text-white">{service.duration}</span>
              </div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex items-center gap-2.5">
              <MapPinIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Tempat Layanan</span>
                <span className="text-sm font-semibold text-white truncate block max-w-[140px]">
                  {service.location}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-1">
              Tentang Layanan
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-800/30 p-3.5 rounded-xl border border-slate-800">
              {service.description}
            </p>
          </div>

          {/* Document Requirements Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Persyaratan Berkas</span>
              </h4>
              <span className="text-xs text-teal-400 font-medium">Centang dokumen yang siap</span>
            </div>
            <div className="space-y-2">
              {service.requirements.map((req, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs sm:text-sm ${
                    checkedItems[idx]
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-white'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                      checkedItems[idx] ? 'bg-cyan-500 text-slate-950' : 'border border-slate-600'
                    }`}
                  >
                    {checkedItems[idx] && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                  <span className="leading-snug">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Flow Shortcuts if KTP or Beasiswa */}
          {service.id === 'srv-ktp-digital' && onOpenSpecificFlow && (
            <div className="bg-gradient-to-r from-teal-950/80 to-slate-900 p-3.5 rounded-xl border border-teal-500/40 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-teal-300">Mau aktivasi IKD langsung lewat HP?</p>
                <p className="text-xs text-slate-300 mt-0.5">Gunakan simulator aktivasi IKD instan</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenSpecificFlow('ktp');
                }}
                className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                Buka IKD
              </button>
            </div>
          )}

          {service.id === 'srv-beasiswa-gempur' && onOpenSpecificFlow && (
            <div className="bg-gradient-to-r from-purple-950/80 to-slate-900 p-3.5 rounded-xl border border-purple-500/40 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-purple-300">Pendaftaran Beasiswa Semester Aktif</p>
                <p className="text-xs text-slate-300 mt-0.5">Buka form formulir daring beasiswa</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenSpecificFlow('beasiswa');
                }}
                className="px-3.5 py-2 bg-purple-500 hover:bg-purple-400 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                Form Beasiswa
              </button>
            </div>
          )}

          {/* Submission / Application Simulation Form */}
          {submissionSuccess ? (
            <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-4 text-center space-y-2 animate-in zoom-in-95">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Permohonan Berhasil Dikirim!</h4>
              <p className="text-sm text-slate-200">
                Nomor Tiket Anda: <span className="font-mono text-cyan-300 font-bold">{submissionSuccess}</span>
              </p>
              <p className="text-xs text-slate-300">
                Status permohonan akan diperbarui oleh petugas {service.opd}. Simpan nomor tiket untuk pelacakan.
              </p>
              <button
                onClick={() => setSubmissionSuccess(null)}
                className="mt-2 text-xs sm:text-sm text-cyan-400 hover:underline cursor-pointer"
              >
                Kirim permohonan lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Formulir Permohonan Kilat</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Nomor Induk Kependudukan (NIK)</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="16 Digit NIK KTP Lamongan"
                    value={applicantNik}
                    onChange={(e) => setApplicantNik(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Nama Lengkap Pemohon</label>
                  <input
                    type="text"
                    required
                    placeholder="Sesuai KTP"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Nomor WhatsApp Aktif</label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx (Untuk notifikasi status)"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Memverifikasi Berkas...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Ajukan Permohonan Layanan</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
