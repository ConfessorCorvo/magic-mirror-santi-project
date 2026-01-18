
import React from 'react';
import { Dumbbell } from 'lucide-react';
import { WorkoutExercise } from '../types';

interface WorkoutProps {
  routine: {
    day: string;
    exercises: WorkoutExercise[];
  };
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  return (
    <div className="w-80 mirror-text text-right">
      <h3 className="text-sm font-semibold opacity-50 uppercase flex items-center justify-end gap-2 mb-4">
         Today's Workout <Dumbbell size={14} />
      </h3>
      <p className="text-xl font-medium mb-3 text-emerald-400">{routine.day}</p>
      <div className="space-y-3">
        {routine.exercises.map((ex, i) => (
          <div key={i}>
            <p className="text-lg">{ex.name}</p>
            <p className="text-sm opacity-40">{ex.sets}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
