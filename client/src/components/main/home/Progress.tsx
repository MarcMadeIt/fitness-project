import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const Progress = () => {
  const [workoutSessions, setWorkoutSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError(null);

      const requestBody = {
        query: `
          query {
            getWorkoutSessions {
              creator {
                _id
                username 
              }
              createdAt
              workoutLogs {
                _id
                workoutType {
                  name  
                }
                reps
                weight
                sets
              }
            }
          }
        `,
      };

      try {
        const response = await axios.post(
          process.env.NODE_ENV === "production"
            ? "https://staystrong.vercel.app/graphql"
            : "http://localhost:3000/graphql",
          requestBody,
          {
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (response.status === 200) {
          const sessions = response.data.data.getWorkoutSessions;
          setWorkoutSessions(sessions);
        } else {
          setError("Failed to fetch workout sessions.");
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setError("Error fetching workout sessions: " + err.message);
        } else {
          setError("Unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [token]);

  const calculateTotalLogs = () => {
    return workoutSessions.reduce(
      (total, session) =>
        total + (session.workoutLogs ? session.workoutLogs.length : 0),
      0
    );
  };

  const calculateProgress = (totalLogs: number) => {
    const maxLogs = 50;
    return Math.min((totalLogs / maxLogs) * 100, 100);
  };

  const totalLogs = calculateTotalLogs();

  return (
    <div>
      <div className="mb-3 text-sm pl-2">
        <h3>My Progress</h3>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 bg-base-200 w-full rounded-lg py-8">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div
            className="radial-progress text-primary bg-base-200 border-4 border-base-200"
            style={
              {
                "--value": calculateProgress(totalLogs),
                "--size": "7rem",
                "--thickness": "12px",
              } as React.CSSProperties
            }
            role="progressbar"
          >
            <span className="text-4xl font-extrabold">{totalLogs}</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <span className="text-ms font-semibold text-primary">
            Total Workouts
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
