
import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const Calendar: React.FC = () => {
  const events = [
    { title: "Project Review with Team", time: "10:00 - 11:30", color: "bg-emerald-500", loc: "Meeting Room 4" },
    { title: "Magic Mirror Pi Assembly", time: "13:00 - 14:00", color: "bg-amber-500", loc: "Workshop" },
    { title: "Gym Session (Legs)", time: "17:00 - 18:30", color: "bg-indigo-500", loc: "PureGym" },
    { title: "Dinner with Sarah", time: "20:00", color: "bg-pink-500", loc: "Shoreditch" },
  ];

  return (
    <div className="w-full max-w-lg mirror-text ml-auto">
      <h3 className="text-sm font-semibold opacity-30 uppercase tracking-[0.2em] flex items-center gap-3 mb-8 justify-end">
        Schedule <CalendarIcon size={16} />
      </h3>
      <div className="space-y-8">
        {events.map((e, i) => (
          <div key={i} className="flex gap-6 justify-end items-start text-right group">
            <div className="flex-1">
              <p className="text-2xl font-light leading-tight mb-1">{e.title}</p>
              <div className="flex items-center gap-3 justify-end opacity-40">
                <span className="text-sm font-light italic">{e.loc}</span>
                <span className="text-xs font-semibold uppercase">{e.time}</span>
              </div>
            </div>
            <div className={`mt-2 w-1.5 h-12 ${e.color} opacity-30 group-hover:opacity-100 transition-opacity rounded-full`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
