
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarProps {
  events: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <div className="w-full max-w-lg mirror-text ml-auto">
      <h3 className="text-sm font-semibold opacity-30 uppercase tracking-[0.2em] flex items-center gap-3 mb-8 justify-end">
        Schedule <CalendarIcon size={16} />
      </h3>
      <div className="space-y-8">
        {events.length > 0 ? events.map((e) => (
          <div key={e.id} className="flex gap-6 justify-end items-start text-right group">
            <div className="flex-1">
              <p className="text-2xl font-light leading-tight mb-1">{e.title}</p>
              <div className="flex items-center gap-3 justify-end opacity-40">
                <span className="text-sm font-light italic">{e.location}</span>
                <span className="text-xs font-semibold uppercase">{e.time}</span>
              </div>
            </div>
            <div className={`mt-2 w-1.5 h-12 ${e.color} opacity-30 group-hover:opacity-100 transition-opacity rounded-full`}></div>
          </div>
        )) : (
          <p className="text-right opacity-20 italic">No upcoming events today.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
