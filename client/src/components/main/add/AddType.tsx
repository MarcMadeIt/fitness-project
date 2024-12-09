import { useState } from "react";
import Alert from "../../messages/Alert";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import axios from "axios";

interface AddTypeProps {
  onClose: () => void;
}

const AddType = ({ onClose }: AddTypeProps) => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [part, setPart] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.user?.token);

  const clearForm = () => {
    setName("");
    setDesc("");
    setPart("");
    setError(null);
  };

  const handleAddType = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("User is not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(async () => {
      const requestBody = {
        query: `
          mutation {
            createWorkoutType(
              workoutTypeInput: {
                name: "${name}",
                desc: "${desc}",
                part: "${part}"
              }
            ) {
              name
              desc
              part
              creator {
                _id 
                username
              }
            }
          }
        `,
      };

      try {
        // Use axios for making the GraphQL request
        const response = await axios.post(
          "http://localhost:3000/graphql",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Enable cookies if needed for authentication
          }
        );

        const result = response.data;

        if (response.status === 200 && !result.errors) {
          console.log("WorkoutType created:", result);
          onClose();
          clearForm();
          setAlertMessage("WorkoutType created successfully!");
        } else {
          const errorMessage =
            result.errors?.[0]?.message || "Something went wrong.";
          setError(errorMessage);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 2000); // Delay of 2 seconds
  };

  return (
    <>
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      <div className="modal modal-open modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create WorkoutType</h3>
          <p className="py-4">Here, you can create a new workout type.</p>
          <form className="flex flex-col gap-3" onSubmit={handleAddType}>
            <label htmlFor="name" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Name</span>
              </div>
              <input
                type="text"
                id="name"
                placeholder="Pull-ups..."
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label htmlFor="desc" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Description</span>
              </div>
              <input
                type="text"
                id="desc"
                placeholder="Hang in your arms..."
                className="input input-bordered w-full max-w-xs"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </label>
            <label htmlFor="part" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-xs">Body Area</span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs"
                id="part"
                value={part}
                onChange={(e) => setPart(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose part of body
                </option>
                <option value="Front">Front</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Overall">Overall</option>
              </select>
            </label>
            {error && <div className="text-xs text-error">{error}</div>}
            <div>
              <button
                type="submit"
                className="btn btn-outline btn-primary mt-5"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create WorkoutType"}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddType;
