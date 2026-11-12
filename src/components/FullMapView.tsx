import React, { useState } from 'react';
import { MapPin as MapPinIcon, Navigation, Phone, Clock, Building, Compass, CheckCircle2 } from 'lucide-react';
import { KECAMATAN_LIST, MAP_PINS, SERVICES_DATA } from '../data/portalData';
import { MapPin, ServiceItem } from '../types';

interface FullMapViewProps {
  onSelectService: (service: ServiceItem) => void;
}

interface KecamatanDetail {
  name: string;
  kantor: string;
  alamat: string;
  puskesmas: string;
  hotline: string;
  jamBuka: string;
  mppJarak: string;
  servicesAvailable: string[];
}

const KECAMATAN_DETAILS: { [key: string]: KecamatanDetail } = {
  Lamongan: {
    name: 'Kecamatan Lamongan (Pusat Kota)',
    kantor: 'Kantor Kecamatan Lamongan & Mal Pelayanan Publik (MPP)',
    alamat: 'Jl. Basuki Rahmat No. 1, Lamongan Kota',
    puskesmas: 'Puskesmas Lamongan Kota & RSUD dr. Soegiri',
    hotline: '(0322) 321110',
    jamBuka: 'Senin - Jumat, 08.00 - 15.30 WIB',
    mppJarak: '0.5 km (Pusat MPP)',
    servicesAvailable: ['Perekaman KTP & IKD', 'Beasiswa Gempur', 'Perizinan OSS', 'Akta Kelahiran 3-in-1'],
  },
  Babat: {
    name: 'Kecamatan Babat',
    kantor: 'Kantor Camat Babat & MPP Mini Wilayah Barat',
    alamat: 'Jl. Raya Babat - Surabaya No. 45, Babat',
    puskesmas: 'Puskesmas Babat & RSUD Karangkembang',
    hotline: '(0322) 451020',
    jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
    mppJarak: '28 km dari Ibu Kota',
    servicesAvailable: ['Perekaman KTP Online', 'Pelayanan Pajak Daerah PBB', 'Izin Usaha Mikro'],
  },
  Brondong: {
    name: 'Kecamatan Brondong (Pantura)',
    kantor: 'Kantor Camat Brondong & Sentra Maritim',
    alamat: 'Jl. Raya Daendels Pantura, Brondong',
    puskesmas: 'Puskesmas Brondong & Puskesmas Sedayulawas',
    hotline: '(0322) 661054',
    jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
    mppJarak: '46 km dari Ibu Kota',
    servicesAvailable: ['Layanan Nelayan & KTP Digital', 'Surat Izin Kapal Penangkap Ikan (SIPI)', 'Akta Lahir'],
  },
  Paciran: {
    name: 'Kecamatan Paciran (Pesisir & Wisata)',
    kantor: 'Kantor Kecamatan Paciran',
    alamat: 'Jl. Raya Paciran KM 3, Paciran',
    puskesmas: 'Puskesmas Paciran & RSML Cabang Paciran',
    hotline: '(0322) 661200',
    jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
    mppJarak: '42 km dari Ibu Kota',
    servicesAvailable: ['KTP Digital & KIA', 'Izin Usaha Wisata Kuliner', 'Homecare Lansia'],
  },
  Sekaran: {
    name: 'Kecamatan Sekaran',
    kantor: 'Kantor Kecamatan Sekaran',
    alamat: 'Jl. Raya Sekaran No. 12, Sekaran',
    puskesmas: 'Puskesmas Sekaran',
    hotline: '(0322) 391450',
    jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
    mppJarak: '22 km dari Ibu Kota',
    servicesAvailable: ['Beasiswa Gempur Pelajar', 'Administrasi Kependudukan', 'Bansos DTKS'],
  },
  Sukodadi: {
    name: 'Kecamatan Sukodadi',
    kantor: 'Kantor Camat Sukodadi',
    alamat: 'Jl. Panglima Sudirman No. 8, Sukodadi',
    puskesmas: 'Puskesmas Sukodadi',
    hotline: '(0322) 391118',
    jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
    mppJarak: '14 km dari Ibu Kota',
    servicesAvailable: ['Perekaman e-KTP', 'PBB-P2', 'Surat Pindah Domisili'],
  },
  Ngimbang: {
    name: 'Kecamatan Ngimbang (Wilayah Selatan)',
    kantor: 'Kantor Kecamatan Ngimbang & PATEN Terpadu',
    alamat: 'Jl. Babat - Jombang No. 50, Ngimbang',
    puskesmas: 'Puskesmas Ngimbang & RSUD Ngimbang',
    hotline: '(0322) 453112',
    jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
    mppJarak: '48 km dari Ibu Kota',
    servicesAvailable: ['Pelayanan RSUD Ngimbang', 'Layanan KTP & KK Cepat', 'Izin Pertanian'],
  },
};

export const FullMapView: React.FC<FullMapViewProps> = ({ onSelectService }) => {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Lamongan');

  const detail =
    KECAMATAN_DETAILS[selectedKecamatan] || {
      name: `Kecamatan ${selectedKecamatan}`,
      kantor: `Kantor Camat ${selectedKecamatan}`,
      alamat: `Jl. Raya ${selectedKecamatan}, Kab. Lamongan`,
      puskesmas: `Puskesmas ${selectedKecamatan}`,
      hotline: '(0322) 321000',
      jamBuka: 'Senin - Jumat, 08.00 - 15.00 WIB',
      mppJarak: 'Terhubung Geoportal Lamongan',
      servicesAvailable: ['Layanan KTP & KK', 'Surat Pengantar Nikah', 'Pelayanan Paten Terpadu'],
    };

  return (
    <div className="w-full pb-32 px-4 sm:px-6 lg:px-8 pt-4 space-y-5 max-w-7xl mx-auto select-none">
      {/* Geoportal Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-cyan-500/30 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              GEOPORTAL LAYANAN PUBLIK KABUPATEN LAMONGAN
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200 mt-0.5">
              Peta Sebaran Kantor Layanan &amp; Fasilitas Pelayanan Terpadu di 27 Kecamatan
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Grid: Left Column for Map, Right Column for Kecamatan Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Kecamatan Selector + Big Map Canvas */}
        <div className="lg:col-span-7 space-y-4">
          {/* Kecamatan Selector */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 space-y-2 shadow-lg">
            <label className="text-xs sm:text-sm font-bold text-slate-300 block flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-cyan-400" />
              <span>Pilih Kecamatan Tujuan</span>
            </label>
            <select
              value={selectedKecamatan}
              onChange={(e) => setSelectedKecamatan(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
            >
              {KECAMATAN_LIST.filter((k) => k !== 'Semua Kecamatan').map((kec) => (
                <option key={kec} value={kec}>
                  Kecamatan {kec}
                </option>
              ))}
            </select>
          </div>

          {/* Map Graphic Canvas */}
          <div className="relative w-full h-80 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-slate-950">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA78O7Lpac8S0SGEz-OhIeMqJaTDsro-RiXFubLAYHf5ldo3Dw4zIHM3LBk4K8vSzYh_1k9GvrhGKwfJ68ZTJEzN08JbefCU48xX_Fu22U9mrsfY8APwoZrqm2wwxeP33a5fK0TbtVN-pGd86EMSTmyVou6tVdS67nDKJOgbWcC9t6Io_e1WxjgDgnF0ciD-gkNswWL_2jkIT04WZeGd9lqnecqKpVJnByCcimTLGd0LYAp-umq-Ts4"
              alt="Peta Wilayah Lamongan"
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            {/* Visual Pins on Map */}
            {MAP_PINS.map((pin) => (
              <div
                key={pin.id}
                onClick={() => {
                  const found = SERVICES_DATA.find((s) => s.id === pin.serviceId);
                  if (found) onSelectService(found);
                }}
                style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                title={`${pin.title} - ${pin.subtitle}`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                    pin.glowType === 'purple'
                      ? 'bg-purple-600 border border-purple-300'
                      : 'bg-teal-500 border border-cyan-300'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                </div>
              </div>
            ))}

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 text-xs sm:text-sm text-cyan-300 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Wilayah Terpilih: {selectedKecamatan}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Kecamatan Details Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-700/70 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-cyan-400" />
                <span>{detail.name}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{detail.kantor}</p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPinIcon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{detail.alamat}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{detail.jamBuka}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Kontak Layanan: <strong className="text-white">{detail.hotline}</strong></span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Navigation className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Fasilitas Kesehatan: {detail.puskesmas}</span>
              </div>
            </div>

            {/* Services List in this Kecamatan */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                Layanan Unggulan di Kecamatan Ini:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {detail.servicesAvailable.map((srv, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
