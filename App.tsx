
import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import Workout from './components/Workout';
import News from './components/News';
import TfLModule from './components/TfLModule';
import MusicPlayer from './components/MusicPlayer';
import GeminiBriefing from './components/GeminiBriefing';
import RemoteControl from './components/RemoteControl';
import QRCodeOverlay from './components/QRCodeOverlay';
import { Terminal, Settings } from 'lucide-react';
import { MirrorConfig } from './types';

const DEFAULT_CONFIG: MirrorConfig = {
  userName: "Commander",
  persona: "digital oracle",
  tflLines: ['Northern', 'Victoria', 'Central'],
  workout: {
    day: "Legs & Core",
    exercises: [
      { name: "Barbell Squats", sets: "4 x 8" },
      { name: "Deadlifts", sets: "3 x 5" },
      { name: "Plank", sets: "3 x 1 min" }
    ]
  },
  events: [
    { id: '1', title: "Project Review", time: "10:00 - 11:30", color: "bg-emerald-500", location: "Meeting Room 4" },
    { id: '2', title: "Mirror Assembly", time: "13:00 - 14:00", color: "bg-amber-500", location: "Workshop" },
    { id: '3', title: "Gym Session", time: "17:00 - 18:30", color: "bg-indigo-500", location: "PureGym" },
  ]
};

const App: React.FC = () => {
  const [page, setPage] = useState(0);
  const [isRemote, setIsRemote] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [config, setConfig] = useState<MirrorConfig>(() => {
    const saved = localStorage.getItem('mirror_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const totalPages = 3;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'remote') {
      setIsRemote(true);
    }

    // Sync state between tabs/devices if using a real backend, 
    // for now we use storage events for local testing
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mirror_config' && e.newValue) {
        setConfig(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateConfig = (newConfig: MirrorConfig) => {
    setConfig(newConfig);
    localStorage.setItem('mirror_config', JSON.stringify(newConfig));
    // Trigger storage event for same-tab updates if needed
    window.dispatchEvent(new Event('storage'));
  };

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  if (isRemote) {
    return <RemoteControl config={config} onUpdate={updateConfig} />;
  }

  return (
    <div className="relative h-screen w-screen p-8 select-none bg-black overflow-hidden font-inter">
      {/* Invisible Touch Zones for Navigation */}
      <div className="absolute top-0 left-0 w-24 h-full z-40 cursor-pointer active:bg-white/5" onClick={prevPage} />
      <div className="absolute top-0 right-0 w-24 h-full z-40 cursor-pointer active:bg-white/5" onClick={nextPage} />

      {/* Settings Trigger */}
      <button 
        onClick={() => setShowQR(true)}
        className="absolute top-4 right-4 z-50 p-2 text-white/20 hover:text-white/60 transition-colors"
      >
        <Settings size={20} />
      </button>

      {showQR && <QRCodeOverlay onClose={() => setShowQR(false)} />}

      <div className="h-full w-full grid grid-cols-12 grid-rows-12 gap-6 relative">
        <div className={`transition-all duration-700 ease-in-out ${page === 0 ? 'col-span-6 row-span-3' : 'col-span-4 row-span-1'}`}>
          <Clock compact={page !== 0} />
        </div>

        {page === 0 && (
          <div className="contents">
            <div className="col-start-9 col-span-4 row-span-3 flex flex-col items-end animate-in fade-in duration-1000">
              <Weather />
            </div>
            <div className="col-start-2 col-span-10 row-start-5 row-span-3 flex items-center justify-center text-center animate-in zoom-in-95 duration-1000">
              <GeminiBriefing userName={config.userName} persona={config.persona} />
            </div>
            <div className="col-start-3 col-span-8 row-start-10 row-span-3 flex items-end justify-center animate-in slide-in-from-bottom-12 duration-1000">
              <MusicPlayer />
            </div>
          </div>
        )}

        {page === 1 && (
          <div className="contents">
            <div className="col-start-9 col-span-4 row-span-2 flex flex-col items-end opacity-40 animate-in fade-in duration-1000">
              <Weather />
            </div>
            <div className="col-span-5 row-start-3 row-span-8 space-y-8 flex flex-col justify-center animate-in slide-in-from-left-12 duration-1000">
              <TfLModule lines={config.tflLines} />
            </div>
            <div className="col-start-7 col-span-6 row-start-3 row-span-8 flex flex-col justify-center animate-in slide-in-from-right-12 duration-1000">
              <Calendar events={config.events} />
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="contents">
            <div className="col-span-6 row-start-3 row-span-8 flex flex-col justify-center animate-in slide-in-from-left-12 duration-1000">
              <News />
            </div>
            <div className="col-start-7 col-span-6 row-start-3 row-span-8 flex flex-col justify-center items-end animate-in slide-in-from-right-12 duration-1000">
              <Workout routine={config.workout} />
            </div>
            <div className="col-start-4 col-span-6 row-start-11 row-span-2 flex items-end justify-center opacity-30 animate-in fade-in duration-1000">
              <MusicPlayer />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 z-40">
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i}
            onClick={() => setPage(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${page === i ? 'w-8 bg-white' : 'w-1.5 bg-white/20'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-4 flex items-center gap-2 opacity-10 font-mono text-[10px] pointer-events-none">
        <Terminal size={10} />
        <span>RPI_OS_KERN: 5.10.x // IP: 127.0.0.1 // MODE: {isRemote ? 'REMOTE' : 'MIRROR'}</span>
      </div>
    </div>
  );
};

export default App;
