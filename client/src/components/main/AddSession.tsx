import { useState } from "react";
import AddWorkout from "./add/AddWorkout";

interface Workout {
  id: number;
  isOpen: boolean;
  workoutType?: string;
}

const AddSession = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: 1, isOpen: true },
  ]);

  const saveAndAddNewWorkout = (id: number, workoutType: string) => {
    const updatedWorkouts = workouts.map((workout) =>
      workout.id === id
        ? { ...workout, workoutType, isOpen: false }
        : { ...workout, isOpen: false }
    );

    setWorkouts([
      ...updatedWorkouts,
      { id: workouts.length + 1, isOpen: true },
    ]);
  };

  const toggleWorkout = (id: number) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id
          ? { ...workout, isOpen: !workout.isOpen }
          : { ...workout, isOpen: false }
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      {workouts.map((workout) => (
        <div key={workout.id} className="collapse bg-base-200 rounded-box">
          <input
            type="checkbox"
            className="peer hidden"
            checked={workout.isOpen}
            readOnly
          />
          <div
            className="collapse-title cursor-pointer peer-checked:bg-base-300 peer-checked:text-primary flex justify-between px-5"
            onClick={() => toggleWorkout(workout.id)}
          >
            <span className="font-medium">
              {workout.workoutType || "Add Workout"}
            </span>
            <div className="w-6 h-6 bg-base-200 rounded-full flex justify-center items-center ring-2 ring-base-content">
              <span className="text-base-content text-sm">{workout.id}</span>
            </div>
          </div>
          <div className="collapse-content peer-checked:block">
            <AddWorkout
              onSave={(workoutType) => {
                saveAndAddNewWorkout(workout.id, workoutType);
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-6">
        <button className="btn btn-primary">Complete Workout</button>
      </div>
    </div>
  );
};

export default AddSession;
