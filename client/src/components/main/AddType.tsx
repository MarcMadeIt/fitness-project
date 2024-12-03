interface AddTypeProps {
  onClose: () => void;
}

const AddType = ({ onClose }: AddTypeProps) => {
  return (
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create WorkoutType</h3>
        <p className="py-4">Here, you can create a new workout type.</p>
        <form action="" className="flex flex-col gap-3">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xs">Name</span>
            </div>
            <input
              type="text"
              placeholder="Pull-ups..."
              className="input input-bordered w-full max-w-xs"
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xs">Description</span>
            </div>
            <input
              type="text"
              placeholder="Hang in your the arms...."
              className="input input-bordered w-full max-w-xs"
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-xs">Body Area</span>
            </div>
            <select className="select select-bordered w-full max-w-xs" required>
              <option value="" disabled selected>
                Choose part of body
              </option>
              <option>Front</option>
              <option>Back</option>
              <option>Legs</option>
              <option>Overall</option>
            </select>
          </label>
          <button className="btn btn-outline btn-primary mt-5">
            Save WorkoutType
          </button>
        </form>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddType;
