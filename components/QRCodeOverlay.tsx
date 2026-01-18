
import React from 'react';
import { X, Smartphone, Link as LinkIcon } from 'lucide-react';

interface QRCodeOverlayProps {
  onClose: () => void;
}

const QRCodeOverlay: React.FC<QRCodeOverlayProps> = ({ onClose }) => {
  // In a real local net, this would use the Pi's IP. 
  // For demo, we use the current origin + param.
  const remoteUrl = `${window.location.origin}/?mode=remote`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/40 hover:text-white"
      >
        <X size={32} />
      </button>

      <div className="bg-zinc-900 border border-white/10 p-12 rounded-3xl text-center max-w-md space-y-8">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Smartphone size={32} className="text-white/60" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-light tracking-tight">Remote Pairing</h2>
          <p className="text-white/40 text-sm">Scan this code with your phone to take control of the mirror from your hand.</p>
        </div>

        {/* Pseudo QR Code (using CSS for aesthetic) */}
        <div className="w-48 h-48 bg-white p-2 mx-auto rounded-xl relative">
          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center overflow-hidden">
             {/* Simple visual mock of a QR code using boxes */}
             <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full p-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`} />
                ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <LinkIcon size={40} className="text-white" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-mono break-all">
            {remoteUrl}
          </p>
          <button 
            onClick={() => window.open(remoteUrl, '_blank')}
            className="text-sm text-blue-400 hover:underline"
          >
            Open in new tab (Debug)
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeOverlay;
