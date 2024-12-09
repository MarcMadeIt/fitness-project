import { useState } from "react";
import SelectWorkoutType from "./elements/SelectWorkoutType";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setRepetitions,
  setSets,
  setWeight,
  setWorkoutType,
} from "../../../store/workout/workoutSlice";
import AddType from "./AddType";

interface AddWorkoutProps {
  onSave: (workoutType: string, id: number) => void;
  workoutId: number;
}

const AddWorkout = ({ onSave, workoutId }: AddWorkoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const workoutState = useSelector((state: RootState) => state.workout);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setWorkoutType(e.target.value));
  };

  const handleSave = () => {
    onSave(workoutState.workoutType, workoutId);
    dispatch(setWorkoutType(""));
    dispatch(setWeight(null));
    dispatch(setSets(null));
    dispatch(setRepetitions(null));
  };

  const handleInputChange = (field: string, value: number) => {
    switch (field) {
      case "weight":
        dispatch(setWeight(value));
        break;
      case "sets":
        dispatch(setSets(value));
        break;
      case "repetitions":
        dispatch(setRepetitions(value));
        break;
      default:
        break;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
              selectedType={workoutState.workoutType}
            />
            <div className="label">
              <span></span>
              <button
                type="button"
                className="link link-primary text-xs"
                onClick={openModal}
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
              required
              value={workoutState.weight || ""}
              onChange={(e) =>
                handleInputChange("weight", Number(e.target.value))
              }
            />
          </label>
          <div className="flex gap-5">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Sets</span>
              </div>
              <input
                type="number"
                placeholder="3 sets..."
                className="input input-bordered w-full max-w-xs"
                required
                value={workoutState.sets || ""}
                onChange={(e) =>
                  handleInputChange("sets", Number(e.target.value))
                }
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Repitions</span>
              </div>
              <input
                type="number"
                placeholder="8 reps..."
                className="input input-bordered w-full max-w-xs"
                required
                value={workoutState.repetitions || ""}
                onChange={(e) =>
                  handleInputChange("repetitions", Number(e.target.value))
                }
              />
            </label>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-outline btn-primary w-full md:w-auto"
          >
            Add Workout
          </button>
        </div>
      </form>

      {isModalOpen && <AddType onClose={closeModal} />}
    </div>
  );
};

export default AddWorkout;
