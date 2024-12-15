import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { updateWorkoutData } from "../../../store/workout/workoutSlice";
import SelectWorkoutType from "./elements/SelectWorkoutType";
import AddType from "./AddType";

interface AddWorkoutProps {
  onSave: (
    workoutType: { _id: string; name: string },
    id: number,
    weight: number | null,
    sets: number | null,
    reps: number | null,
    creator: string
  ) => void;
  workoutId: number;
  isOpen: boolean;
  workoutTypes: { _id: string; name: string }[];
}

const AddWorkout = ({ onSave, workoutId, isOpen }: AddWorkoutProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const workout = useSelector((state: RootState) =>
    state.workout.workouts.find((w) => w.id === workoutId)
  );
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const [selectedWorkoutType, setSelectedWorkoutType] = useState<{
    _id: string;
    name: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChange = (
    selectedType: { _id: string; name: string } | null
  ) => {
    setSelectedWorkoutType(selectedType);

    if (selectedType) {
      dispatch(
        updateWorkoutData({
          id: workoutId,
          workoutType: selectedType._id,
        })
      );
    }
  };

  const handleInputChange = (field: string, value: number | string | null) => {
    dispatch(updateWorkoutData({ id: workoutId, [field]: value }));
  };

  const handleSave = () => {
    if (workout && userId && selectedWorkoutType) {
      onSave(
        selectedWorkoutType,
        workoutId,
        workout.weight || null,
        workout.sets || null,
        workout.reps || null,
        userId
      );
    }
  };

  return (
    <div>
      {isOpen && workout && (
        <form
          className="flex flex-col mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="flex items-center gap-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">WorkoutType</span>
              </div>
              <SelectWorkoutType
                handleSelectChange={handleSelectChange}
                selectedType={
                  selectedWorkoutType ? selectedWorkoutType._id : ""
                }
              />
              <div className="label">
                <span></span>
                <button
                  type="button"
                  className="link link-primary text-xs"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create WorkoutType?
                </button>
              </div>
            </label>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Weight</span>
              </div>
              <input
                type="number"
                placeholder="10 kg..."
                className="input input-bordered w-full max-w-xs"
                value={workout.weight || ""}
                onChange={(e) =>
                  handleInputChange("weight", Number(e.target.value))
                }
                required
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Sets</span>
              </div>
              <input
                type="number"
                placeholder="3 sets..."
                className="input input-bordered w-full max-w-xs"
                value={workout.sets || ""}
                onChange={(e) =>
                  handleInputChange("sets", Number(e.target.value))
                }
                required
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Repetitions</span>
              </div>
              <input
                type="number"
                placeholder="8 reps..."
                className="input input-bordered w-full max-w-xs"
                value={workout.reps || ""}
                onChange={(e) =>
                  handleInputChange("reps", Number(e.target.value))
                }
                required
              />
            </label>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="btn btn-outline btn-primary w-full md:w-auto"
            >
              Save Workout
            </button>
          </div>
        </form>
      )}
      {isModalOpen && <AddType onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AddWorkout;
