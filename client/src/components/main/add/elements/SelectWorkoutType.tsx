import { useEffect, useState } from "react";

interface SelectWorkoutTypeProps {
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedType: string;
}

const SelectWorkoutType = ({
  handleSelectChange,
  selectedType,
}: SelectWorkoutTypeProps) => {
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      setError(null);

      const requestBody = {
        query: `
          query {
            getWorkoutTypes {
              name
            }
          }
        `,
      };

      try {
        const response = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();

        if (response.ok && result?.data?.getWorkoutTypes) {
          setWorkoutTypes(
            result.data.getWorkoutTypes.map(
              (type: { name: string }) => type.name
            )
          );
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={handleSelectChange}
      value={selectedType}
      required
    >
      <option value="" disabled>
        Choose type
      </option>
      {workoutTypes.map((name, index) => (
        <option key={index} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SelectWorkoutType;
