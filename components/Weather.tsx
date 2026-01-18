
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

const Weather: React.FC = () => {
  // Static mock for now - in production use OpenWeatherMap
  const [weather, setWeather] = useState({
    temp: 18,
    condition: 'Partly Cloudy',
    high: 21,
    low: 14,
    forecast: [
      { day: 'Tue', temp: 19, icon: 'sun' },
      { day: 'Wed', temp: 17, icon: 'cloud' },
      { day: 'Thu', temp: 15, icon: 'rain' },
    ]
  });

  return (
    <div className="text-right mirror-text">
      <div className="flex items-center justify-end space-x-4">
        <div>
          <h2 className="text-6xl font-light">{weather.temp}°</h2>
          <p className="text-xl opacity-70 uppercase tracking-widest">{weather.condition}</p>
        </div>
        <Sun size={64} strokeWidth={1} className="opacity-90" />
      </div>
      
      <div className="mt-6 flex justify-end space-x-8 opacity-60">
        {weather.forecast.map((f, i) => (
          <div key={i} className="text-center">
            <p className="text-sm uppercase tracking-tighter mb-1">{f.day}</p>
            {f.icon === 'sun' && <Sun size={20} className="mx-auto" />}
            {f.icon === 'cloud' && <Cloud size={20} className="mx-auto" />}
            {f.icon === 'rain' && <CloudRain size={20} className="mx-auto" />}
            <p className="text-lg mt-1">{f.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
