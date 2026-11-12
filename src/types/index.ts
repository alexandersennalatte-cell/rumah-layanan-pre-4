export type LifecycleStage = 'kelahiran' | 'sekolah' | 'ktp-kuliah' | 'kerja' | 'lansia';

export type NavTab = 'beranda' | 'peta' | 'layanan' | 'lapor';

export interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  category: 'Kependudukan' | 'Pendidikan' | 'Perizinan' | 'Kesehatan' | 'Sosial' | 'Ketenagakerjaan';
  lifecycle: LifecycleStage;
  description: string;
  requirements: string[];
  duration: string;
  opd: string;
  location: string;
  isOnline: boolean;
  isFree: boolean;
  pinCoordinates?: { x: number; y: number }; // Percentage for map
  glowType?: 'cyan' | 'purple' | 'blue';
  popular?: boolean;
}

export interface MapPin {
  id: string;
  title: string;
  subtitle: string;
  serviceId: string;
  x: number; // percentage
  y: number; // percentage
  glowType: 'cyan' | 'purple' | 'blue';
  iconType: 'ktp' | 'beasiswa' | 'mpp' | 'kesehatan' | 'izin';
  kecamatan: string;
}

export interface ComplaintReport {
  id: string;
  ticketNumber: string;
  category: string;
  title: string;
  description: string;
  reporterName: string;
  reporterPhone: string;
  kecamatan: string;
  status: 'Menunggu Verifikasi' | 'Diproses OPD' | 'Selesai';
  date: string;
}
