import { useDispatch, useSelector } from "react-redux";
import {
  addNewWorkout,
  completeWorkout,
  resetSession,
  saveWorkout,
  toggleWorkoutVisibility,
} from "../../../store/workout/workoutSlice";
import { RootState } from "../../../store/store";
import AddWorkout from "./AddWorkout";

const AddSession = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state: RootState) => state.workout.workouts);

  const saveAndAddNewWorkout = (id: number, workoutType: string) => {
    dispatch(saveWorkout({ id, workoutType }));
    dispatch(addNewWorkout());
  };

  const toggleWorkout = (id: number) => {
    dispatch(toggleWorkoutVisibility(id));
  };

  const completeWorkoutHandler = (id: number) => {
    dispatch(completeWorkout(id));
  };

  const resetSessionHandler = () => {
    dispatch(resetSession());
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
            onClick={() => toggleWorkout(workout.id)} // Toggle workout visibility
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
              workoutId={workout.id}
              onSave={(workoutType) => {
                saveAndAddNewWorkout(workout.id, workoutType);
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          className="btn btn-primary"
          onClick={() =>
            completeWorkoutHandler(workouts[workouts.length - 1].id)
          }
        >
          Complete Workout
        </button>
        <button className="btn btn-sm" onClick={resetSessionHandler}>
          Reset Session
        </button>
      </div>
    </div>
  );
};

export default AddSession;
