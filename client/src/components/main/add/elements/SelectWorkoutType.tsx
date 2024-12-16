import { useState, useEffect } from "react";
import axios from "axios";

interface SelectWorkoutTypeProps {
  handleSelectChange: (
    selectedType: { _id: string; name: string } | null
  ) => void;
  selectedType: string;
}

const graphqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://staystrong.vercel.app/graphql"
    : "http://localhost:3000/graphql";

const SelectWorkoutType = ({
  handleSelectChange,
  selectedType,
}: SelectWorkoutTypeProps) => {
  const [workoutTypes, setWorkoutTypes] = useState<
    { _id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      setError(null);

      const requestBody = {
        query: `
          query {
            getWorkoutTypes {
              _id
              name
            }
          }
        `,
      };

      try {
        const response = await axios.post(graphqlEndpoint, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.data?.data?.getWorkoutTypes) {
          setWorkoutTypes(response.data.data.getWorkoutTypes);
        } else {
          setError("Failed to fetch workout types");
        }
      } catch (err) {
        setError("An error occurred while fetching workout types");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  if (loading) return <span className="loading loading-dots loading-md"></span>;
  if (error) return <div>Error: {error}</div>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedType =
      workoutTypes.find((type) => type._id === selectedId) || null;
    handleSelectChange(selectedType);
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={handleChange}
      value={selectedType}
      required
    >
      <option value="" disabled>
        Choose type
      </option>
      {workoutTypes.map((type) => (
        <option key={type._id} value={type._id}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default SelectWorkoutType;
