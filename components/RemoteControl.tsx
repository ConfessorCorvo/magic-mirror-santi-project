
import React, { useState } from 'react';
import { MirrorConfig, CalendarEvent, WorkoutExercise } from '../types';
import { Save, User, Train, Dumbbell, Calendar as CalIcon, MessageSquare, Plus, Trash2, ArrowLeft } from 'lucide-react';

interface RemoteControlProps {
  config: MirrorConfig;
  onUpdate: (config: MirrorConfig) => void;
}

const RemoteControl: React.FC<RemoteControlProps> = ({ config, onUpdate }) => {
  const [localConfig, setLocalConfig] = useState<MirrorConfig>(config);
  const [activeTab, setActiveTab] = useState<'profile' | 'transit' | 'workout' | 'calendar'>('profile');

  const handleSave = () => {
    onUpdate(localConfig);
    alert('Config Sent to Mirror!');
  };

  const addEvent = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: "New Event",
      time: "12:00",
      color: "bg-blue-500",
      location: "TBD"
    };
    setLocalConfig({ ...localConfig, events: [...localConfig.events, newEvent] });
  };

  const removeEvent = (id: string) => {
    setLocalConfig({ ...localConfig, events: localConfig.events.filter(e => e.id !== id) });
  };

  const addExercise = () => {
    const newEx: WorkoutExercise = { name: "New Exercise", sets: "3 x 10" };
    setLocalConfig({
      ...localConfig,
      workout: { ...localConfig.workout, exercises: [...localConfig.workout.exercises, newEx] }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 pb-24 font-inter">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <ArrowLeft size={20} className="text-white/40" onClick={() => window.location.search = ''} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Mirror Control</h1>
        </div>
        <button 
          onClick={handleSave}
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
        >
          <Save size={16} /> Sync
        </button>
      </header>

      <div className="grid grid-cols-4 gap-2 mb-8">
        {[
          { id: 'profile', icon: User },
          { id: 'transit', icon: Train },
          { id: 'workout', icon: Dumbbell },
          { id: 'calendar', icon: CalIcon },
        ].map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeTab === id ? 'bg-white/10 text-white' : 'bg-white/5 text-white/30'
            }`}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>

      <main className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'profile' && (
          <section className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/40 block mb-2">Display Name</span>
                <input 
                  type="text" 
                  value={localConfig.userName}
                  onChange={e => setLocalConfig({...localConfig, userName: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg outline-none focus:border-white/30"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/40 block mb-2">AI Persona</span>
                <select 
                  value={localConfig.persona}
                  onChange={e => setLocalConfig({...localConfig, persona: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-lg outline-none appearance-none"
                >
                  <option value="digital oracle">Digital Oracle</option>
                  <option value="friendly butler">Friendly Butler</option>
                  <option value="drill sergeant">Drill Sergeant</option>
                  <option value="motivational coach">Motivational Coach</option>
                </select>
              </label>
            </div>
          </section>
        )}

        {activeTab === 'workout' && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white/60 font-medium">Daily Routine</h2>
              <button onClick={addExercise} className="text-white/40"><Plus size={20} /></button>
            </div>
            <input 
              value={localConfig.workout.day}
              onChange={e => setLocalConfig({...localConfig, workout: {...localConfig.workout, day: e.target.value}})}
              className="w-full bg-white/5 p-4 rounded-2xl text-xl font-semibold outline-none"
            />
            {localConfig.workout.exercises.map((ex, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-2xl flex gap-4 items-center">
                <div className="flex-1 space-y-2">
                  <input 
                    value={ex.name}
                    onChange={e => {
                      const newExs = [...localConfig.workout.exercises];
                      newExs[i].name = e.target.value;
                      setLocalConfig({...localConfig, workout: {...localConfig.workout, exercises: newExs}});
                    }}
                    className="w-full bg-transparent font-medium outline-none"
                  />
                  <input 
                    value={ex.sets}
                    onChange={e => {
                      const newExs = [...localConfig.workout.exercises];
                      newExs[i].sets = e.target.value;
                      setLocalConfig({...localConfig, workout: {...localConfig.workout, exercises: newExs}});
                    }}
                    className="w-full bg-transparent text-sm text-white/40 outline-none"
                  />
                </div>
                <button 
                  onClick={() => {
                    const newExs = localConfig.workout.exercises.filter((_, idx) => idx !== i);
                    setLocalConfig({...localConfig, workout: {...localConfig.workout, exercises: newExs}});
                  }}
                  className="text-red-500/40"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'calendar' && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white/60 font-medium">Events</h2>
              <button onClick={addEvent} className="text-white/40"><Plus size={20} /></button>
            </div>
            {localConfig.events.map((event) => (
              <div key={event.id} className="bg-white/5 p-4 rounded-2xl space-y-3">
                <input 
                  value={event.title}
                  onChange={e => {
                    const newEvents = localConfig.events.map(ev => ev.id === event.id ? {...ev, title: e.target.value} : ev);
                    setLocalConfig({...localConfig, events: newEvents});
                  }}
                  className="w-full bg-transparent font-semibold text-lg outline-none"
                />
                <div className="flex gap-4">
                  <input 
                    value={event.time}
                    onChange={e => {
                      const newEvents = localConfig.events.map(ev => ev.id === event.id ? {...ev, time: e.target.value} : ev);
                      setLocalConfig({...localConfig, events: newEvents});
                    }}
                    className="bg-white/5 px-3 py-1 rounded-lg text-xs outline-none"
                  />
                  <input 
                    value={event.location}
                    onChange={e => {
                      const newEvents = localConfig.events.map(ev => ev.id === event.id ? {...ev, location: e.target.value} : ev);
                      setLocalConfig({...localConfig, events: newEvents});
                    }}
                    placeholder="Location"
                    className="bg-white/5 px-3 py-1 rounded-lg text-xs outline-none flex-1"
                  />
                  <button onClick={() => removeEvent(event.id)} className="text-red-500/40"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none">
        <p className="text-[10px] text-center text-white/20 uppercase tracking-[0.3em] font-mono">
          End-to-End Encrypted Sync • v1.0.4
        </p>
      </footer>
    </div>
  );
};

export default RemoteControl;
