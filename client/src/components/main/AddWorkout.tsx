import { useState } from "react";
import AddType from "./AddType";

interface AddWorkoutProps {
  onSave: (workoutType: string) => void;
}

const AddWorkout = ({ onSave }: AddWorkoutProps) => {
  const [workoutType, setWorkoutType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled selected>
                Choose type
              </option>
              <option>Dead Lift</option>
              <option>Leg Press</option>
            </select>
            <div className="label">
              <span></span>
              <button
                type="button"
                className="link link-primary text-xs"
                onClick={openModal}
              >
                Create WorkoutType?
              </button>
              {isModalOpen && <AddType onClose={closeModal} />}
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
    </div>
  );
};

export default AddWorkout;
