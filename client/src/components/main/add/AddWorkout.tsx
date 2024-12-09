import { useState } from "react";
import AddType from "./AddType";
import SelectWorkoutType from "./elements/SelectWorkoutType";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setRepetitions,
  setSets,
  setWeight,
} from "../../../store/workout/workoutSlice";

interface AddWorkoutProps {
  onSave: (workoutType: string) => void;
}

const AddWorkout = ({ onSave }: AddWorkoutProps) => {
  const [workoutType, setWorkoutType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const workoutState = useSelector((state: RootState) => state.workout);

  const currentWorkoutType = workoutState.workoutType;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkoutType(e.target.value);
  };

  const handleSave = () => {
    onSave(workoutType);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            {/* Pass the selectedType to SelectWorkoutType */}
            <SelectWorkoutType
              handleSelectChange={handleSelectChange}
              selectedType={workoutType || currentWorkoutType}
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
                onChange={(e) =>
                  handleInputChange("repetitions", Number(e.target.value))
                }
              />
            </label>
          </div>
        </div>
        <div className=" mt-5">
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
