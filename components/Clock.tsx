
import React, { useState, useEffect } from 'react';

interface ClockProps {
  compact?: boolean;
}

const Clock: React.FC<ClockProps> = ({ compact = false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dateString = time.toLocaleDateString('en-GB', { 
    weekday: compact ? 'short' : 'long', 
    day: 'numeric', 
    month: compact ? 'short' : 'long' 
  });

  return (
    <div className={`mirror-text transition-all duration-500 ${compact ? 'flex items-center gap-6' : ''}`}>
      <div className="flex items-baseline">
        <h1 className={`font-light tracking-tighter transition-all duration-500 ${compact ? 'text-5xl' : 'text-8xl'}`}>
          {timeString}
        </h1>
        {!compact && (
          <span className="text-3xl font-extralight ml-2 opacity-50">{seconds}</span>
        )}
      </div>
      <p className={`font-light opacity-80 transition-all duration-500 ${compact ? 'text-xl' : 'text-2xl mt-2'}`}>
        {dateString}
      </p>
    </div>
  );
};

export default Clock;
