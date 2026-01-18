
import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import Workout from './components/Workout';
import News from './components/News';
import TfLModule from './components/TfLModule';
import MusicPlayer from './components/MusicPlayer';
import GeminiBriefing from './components/GeminiBriefing';
import { Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [page, setPage] = useState(0);
  const [hasError, setHasError] = useState(false);
  const totalPages = 3;

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  // Global error listener for robust terminal operation
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error("Mirror OS Critical Error:", e.error);
      // We don't setHasError(true) here necessarily to keep the UI up, 
      // but we log it for the Pi terminal.
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <div className="relative h-screen w-screen p-8 select-none bg-black overflow-hidden font-inter">
      {/* Invisible Touch Zones for Navigation */}
      <div 
        className="absolute top-0 left-0 w-24 h-full z-50 cursor-pointer active:bg-white/5 transition-colors"
        onClick={prevPage}
        title="Previous Page"
      />
      <div 
        className="absolute top-0 right-0 w-24 h-full z-50 cursor-pointer active:bg-white/5 transition-colors"
        onClick={nextPage}
        title="Next Page"
      />

      {/* Grid Container */}
      <div className="h-full w-full grid grid-cols-12 grid-rows-12 gap-6 relative">
        
        {/* Persistent Clock - Changes size based on page */}
        <div className={`transition-all duration-700 ease-in-out ${page === 0 ? 'col-span-6 row-span-3' : 'col-span-4 row-span-1'}`}>
          <Clock compact={page !== 0} />
        </div>

        {/* Page 0: Home / Briefing */}
        {page === 0 && (
          <div className="contents">
            <div className="col-start-9 col-span-4 row-span-3 flex flex-col items-end animate-in fade-in duration-1000">
              <Weather />
            </div>
            <div className="col-start-2 col-span-10 row-start-5 row-span-3 flex items-center justify-center text-center animate-in zoom-in-95 duration-1000">
              <GeminiBriefing />
            </div>
            <div className="col-start-3 col-span-8 row-start-10 row-span-3 flex items-end justify-center animate-in slide-in-from-bottom-12 duration-1000">
              <MusicPlayer />
            </div>
          </div>
        )}

        {/* Page 1: Logistics */}
        {page === 1 && (
          <div className="contents">
            <div className="col-start-9 col-span-4 row-span-2 flex flex-col items-end opacity-40 animate-in fade-in duration-1000">
              <Weather />
            </div>
            <div className="col-span-5 row-start-3 row-span-8 space-y-8 flex flex-col justify-center animate-in slide-in-from-left-12 duration-1000">
              <TfLModule />
            </div>
            <div className="col-start-7 col-span-6 row-start-3 row-span-8 flex flex-col justify-center animate-in slide-in-from-right-12 duration-1000">
              <Calendar />
            </div>
          </div>
        )}

        {/* Page 2: Lifestyle */}
        {page === 2 && (
          <div className="contents">
            <div className="col-span-6 row-start-3 row-span-8 flex flex-col justify-center animate-in slide-in-from-left-12 duration-1000">
              <News />
            </div>
            <div className="col-start-7 col-span-6 row-start-3 row-span-8 flex flex-col justify-center items-end animate-in slide-in-from-right-12 duration-1000">
              <Workout />
            </div>
            <div className="col-start-4 col-span-6 row-start-11 row-span-2 flex items-end justify-center opacity-30 animate-in fade-in duration-1000">
              <MusicPlayer />
            </div>
          </div>
        )}

      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 z-40">
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i}
            onClick={() => setPage(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${page === i ? 'w-8 bg-white' : 'w-1.5 bg-white/20'}`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* Terminal status line at bottom for Pi feel */}
      <div className="absolute bottom-2 left-4 flex items-center gap-2 opacity-10 font-mono text-[10px] pointer-events-none">
        <Terminal size={10} />
        <span>RPI_OS_KERN: 5.10.x // IP: 127.0.0.1 // STATUS: NOMINAL</span>
      </div>
    </div>
  );
};

export default App;
