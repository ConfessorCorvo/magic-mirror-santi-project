
import React, { useState } from 'react';
import { Train, Bus } from 'lucide-react';

interface TfLModuleProps {
  lines: string[];
}

const TfLModule: React.FC<TfLModuleProps> = ({ lines }) => {
  const [arrivals] = useState([
    { line: 'Northern', destination: 'High Barnet', minutes: 2 },
    { line: 'Northern', destination: 'Edgware', minutes: 7 },
    { line: 'Victoria', destination: 'Brixton', minutes: 4 },
  ]);

  const [statuses] = useState([
    { line: 'Northern', status: 'Good Service' },
    { line: 'Victoria', status: 'Minor Delays' },
    { line: 'Central', status: 'Good Service' },
    { line: 'Piccadilly', status: 'Good Service' },
  ]);

  // Filter based on config
  const filteredStatuses = statuses.filter(s => lines.includes(s.line));
  const filteredArrivals = arrivals.filter(a => lines.includes(a.line));

  return (
    <div className="w-full max-w-md mirror-text space-y-10">
      <div className="space-y-6">
        <h3 className="text-sm font-semibold opacity-30 uppercase tracking-[0.2em] flex items-center gap-3">
          <Train size={16} /> Transit Status
        </h3>
        {filteredStatuses.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-8 ${s.line === 'Northern' ? 'bg-zinc-800' : s.line === 'Victoria' ? 'bg-sky-500' : 'bg-red-600'}`}></div>
              <span className="text-2xl font-light">{s.line}</span>
            </div>
            <span className={`text-sm ${s.status === 'Good Service' ? 'opacity-40' : 'text-amber-400 font-medium'}`}>
              {s.status}
            </span>
          </div>
        ))}
        {filteredStatuses.length === 0 && <p className="opacity-20 italic">No lines monitored</p>}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold opacity-30 uppercase tracking-[0.2em] flex items-center gap-3">
          <Bus size={16} /> Live Arrivals
        </h3>
        {filteredArrivals.map((a, i) => (
          <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <p className="text-xs opacity-40 mb-1">{a.line} Line</p>
              <p className="text-xl font-light">{a.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-light text-blue-400">{a.minutes}</p>
              <p className="text-[10px] opacity-30 uppercase">mins</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TfLModule;
