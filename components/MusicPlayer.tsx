
import React from 'react';
import { Play, SkipBack, SkipForward, Music } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const currentTrack = {
    title: "Midnight City",
    artist: "M83",
    progress: 65,
    next: "Starboy - The Weeknd"
  };

  return (
    <div className="w-[500px] mirror-text flex flex-col items-center">
      <div className="flex items-center gap-6 mb-4">
        <div className="w-20 h-20 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/5">
          <Music size={32} className="opacity-20" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold opacity-30 uppercase tracking-[0.2em] mb-1">YouTube Music • Now Playing</p>
          <h2 className="text-3xl font-light">{currentTrack.title}</h2>
          <p className="text-lg opacity-60 font-extralight">{currentTrack.artist}</p>
        </div>
      </div>
      
      <div className="w-full space-y-4">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white opacity-60 transition-all duration-1000" 
            style={{ width: `${currentTrack.progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center px-2">
          <p className="text-xs opacity-30 italic">Up next: {currentTrack.next}</p>
          <div className="flex items-center gap-4 opacity-50 scale-90">
            <SkipBack size={18} />
            <div className="p-1 rounded-full border border-white/20">
              <Play size={18} fill="white" />
            </div>
            <SkipForward size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
