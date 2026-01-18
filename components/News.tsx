
import React, { useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

const News: React.FC = () => {
  const [news] = useState([
    { title: "The Future of Smart Home Hubs is Open Source", source: "The Verge", time: "2h ago" },
    { title: "London Tube Expansion: New Plans Revealed", source: "BBC News", time: "4h ago" },
    { title: "Quantum Computing Reaches New Milestone", source: "Science Daily", time: "5h ago" },
    { title: "Local Parks to Feature AI-Driven Art Installations", source: "Time Out", time: "8h ago" }
  ]);

  return (
    <div className="w-full max-w-xl mirror-text">
      <h3 className="text-sm font-semibold opacity-30 uppercase tracking-[0.2em] flex items-center gap-3 mb-10">
        <Newspaper size={16} /> Latest Briefings
      </h3>
      <div className="space-y-10">
        {news.map((item, i) => (
          <div key={i} className="group border-l border-white/5 pl-6 py-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold tracking-widest text-emerald-400/60 uppercase">{item.source}</span>
              <span className="h-px w-4 bg-white/10"></span>
              <span className="text-[10px] opacity-30 uppercase">{item.time}</span>
            </div>
            <p className="text-2xl font-light leading-snug group-hover:opacity-100 opacity-80 transition-opacity">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
