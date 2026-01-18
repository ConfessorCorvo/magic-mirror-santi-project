
import React, { useState, useEffect } from 'react';
import { getDailyBriefing } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

interface GeminiBriefingProps {
  userName: string;
  persona: string;
}

const GeminiBriefing: React.FC<GeminiBriefingProps> = ({ userName, persona }) => {
  const [data, setData] = useState<{ greeting: string; focus: string } | null>(null);

  useEffect(() => {
    const fetchBriefing = async () => {
      // Pass config to service for customized briefing
      const result = await getDailyBriefing(userName, persona);
      setData(result);
    };

    fetchBriefing();
    const interval = setInterval(fetchBriefing, 4 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userName, persona]);

  if (!data) return (
    <div className="animate-pulse flex items-center gap-2 text-white/20">
      <Sparkles size={20} /> Initializing AI Intelligence...
    </div>
  );

  return (
    <div className="mirror-text max-w-2xl">
      <h1 className="text-5xl font-extralight tracking-tight mb-6">
        {data.greeting}
      </h1>
      <div className="h-px w-24 bg-white/10 mx-auto mb-6"></div>
      <p className="text-xl font-light opacity-60 uppercase tracking-[0.2em]">
        Focus: {data.focus}
      </p>
    </div>
  );
};

export default GeminiBriefing;
