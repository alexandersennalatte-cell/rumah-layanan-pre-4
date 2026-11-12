import React, { useState } from 'react';
import { Header } from './components/Header';
import { InteractiveMap } from './components/InteractiveMap';
import { CitizenLifecycle } from './components/CitizenLifecycle';
import { QuickActions } from './components/QuickActions';
import { BottomNav } from './components/BottomNav';
import { ServiceModal } from './components/ServiceModal';
import { KtpDigitalModal } from './components/KtpDigitalModal';
import { BeasiswaModal } from './components/BeasiswaModal';
import { ServicesCatalogView } from './components/ServicesCatalogView';
import { FullMapView } from './components/FullMapView';
import { LaporView } from './components/LaporView';
import { TrackingModal } from './components/TrackingModal';
import { MppQueueModal } from './components/MppQueueModal';
import { HotlineModal } from './components/HotlineModal';
import { MAP_PINS, SERVICES_DATA } from './data/portalData';
import { LifecycleStage, MapPin, NavTab, ServiceItem } from './types';
import { ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const [activeLifecycle, setActiveLifecycle] = useState<LifecycleStage>('ktp-kuliah');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Modals state
  const [isKtpModalOpen, setIsKtpModalOpen] = useState(false);
  const [isBeasiswaModalOpen, setIsBeasiswaModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isMppQueueModalOpen, setIsMppQueueModalOpen] = useState(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);

  // Filter map pins based on active lifecycle stage
  const currentPins = React.useMemo(() => {
    return MAP_PINS;
  }, []);

  const handleSelectPin = (pin: MapPin) => {
    const service = SERVICES_DATA.find((s) => s.id === pin.serviceId);
    if (service) {
      setSelectedService(service);
    }
  };

  const handleOpenSpecificFlow = (flowType: string) => {
    if (flowType === 'ktp') {
      setIsKtpModalOpen(true);
    } else if (flowType === 'beasiswa') {
      setIsBeasiswaModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative antialiased selection:bg-cyan-500 selection:text-white w-full bg-brand-dark overflow-x-hidden">
      {/* Top Header - Always visible with search & official identity, full-width responsive with desktop tabs */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectService={(srv) => setSelectedService(srv)}
        allServices={SERVICES_DATA}
        onOpenHotline={() => setIsHotlineModalOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1 flex flex-col justify-between relative z-10 w-full">
        {activeTab === 'beranda' && (
          <div className="flex flex-col flex-1 w-full">
            {/* Interactive Geospatial Map Section */}
            <InteractiveMap
              pins={currentPins}
              onSelectPin={handleSelectPin}
              allServices={SERVICES_DATA}
              activeLifecycle={activeLifecycle}
            />

            {/* Citizen Lifecycle Section (SIKLUS HIDUP WARGA) */}
            <CitizenLifecycle
              activeStage={activeLifecycle}
              onSelectStage={(stage) => {
                setActiveLifecycle(stage);
              }}
            />

            {/* Quick Action Cards - Responsive 4 Columns on Desktop */}
            <QuickActions
              onOpenKtpModal={() => setIsKtpModalOpen(true)}
              onOpenBeasiswaModal={() => setIsBeasiswaModalOpen(true)}
              onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
              onOpenMppQueue={() => setIsMppQueueModalOpen(true)}
            />

            {/* Featured Services for Active Lifecycle Stage */}
            <section className="w-full px-4 sm:px-6 lg:px-8 mb-28 pt-2 max-w-7xl mx-auto">
              <div className="flex items-center justify-between px-1 mb-3">
                <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>Layanan Unggulan ({activeLifecycle.toUpperCase().replace('-', ' ')})</span>
                </span>
                <button
                  onClick={() => setActiveTab('layanan')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Semua Katalog</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Responsive Services Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {SERVICES_DATA.filter((s) => s.lifecycle === activeLifecycle).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedService(item)}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all group shadow-lg"
                  >
                    <div className="flex flex-col pr-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                          {item.category}
                        </span>
                        {item.isOnline && (
                          <span className="text-xs font-semibold text-emerald-400">
                            • Online
                          </span>
                        )}
                      </div>
                      <span className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {item.opd}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300 px-3.5 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 whitespace-nowrap group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                      Detail
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'peta' && (
          <FullMapView
            onSelectService={(srv) => setSelectedService(srv)}
          />
        )}

        {activeTab === 'layanan' && (
          <ServicesCatalogView
            onSelectService={(srv) => setSelectedService(srv)}
            initialLifecycle={activeLifecycle}
          />
        )}

        {activeTab === 'lapor' && <LaporView />}
      </main>

      {/* Docked / Floating Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenSpecificFlow={handleOpenSpecificFlow}
      />

      {isKtpModalOpen && (
        <KtpDigitalModal onClose={() => setIsKtpModalOpen(false)} />
      )}

      {isBeasiswaModalOpen && (
        <BeasiswaModal onClose={() => setIsBeasiswaModalOpen(false)} />
      )}

      {isTrackingModalOpen && (
        <TrackingModal onClose={() => setIsTrackingModalOpen(false)} />
      )}

      {isMppQueueModalOpen && (
        <MppQueueModal onClose={() => setIsMppQueueModalOpen(false)} />
      )}

      {isHotlineModalOpen && (
        <HotlineModal onClose={() => setIsHotlineModalOpen(false)} />
      )}
    </div>
  );
}
