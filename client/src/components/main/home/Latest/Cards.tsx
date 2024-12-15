import { useEffect, useState } from "react";
import Card from "./Card";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { WorkoutLog } from "../../../../store/workout/workoutSlice";

interface WorkoutSession {
  creator: {
    _id: string;
    username: string;
  };
  createdAt: string;
  workoutLogs?: WorkoutLog[];
}

const graphqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://staystrong.vercel.app/graphql"
    : "http://localhost:3000/graphql";

const Cards = () => {
  const [listLimitSessions, setListLimitSessions] = useState<WorkoutSession[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);

      const requestBody = {
        query: `
          query {
            getWorkoutLimitSessions {
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
        const response = await axios.post(graphqlEndpoint, requestBody, {
          withCredentials: true,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (response.status === 200) {
          setListLimitSessions(response.data.data.getWorkoutLimitSessions);
        } else {
          setError("Failed to fetch sessions: " + response.statusText);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setError("Error fetching sessions: " + err.message);
        } else {
          setError("Unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [token]);

  const formatDate = (dateStr: string): string => {
    const date = new Date(Number(dateStr));
    return !isNaN(date.getTime()) ? format(date, "dd. MMM yyyy HH:mm") : "";
  };

  const calculateTotalWeight = (logs: WorkoutLog[] = []): number =>
    logs.reduce(
      (sum, log) => sum + (log.weight || 0) * (log.sets || 0) * (log.reps || 0),
      0
    );

  return (
    <>
      <div>
        <div>
          <div className="mb-3 text-sm pl-2 ">
            <h3>My latest</h3>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {listLimitSessions.length > 0 ? (
            <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-evenly">
              {listLimitSessions.map((session, index) => (
                <Card
                  key={index}
                  date={formatDate(session.createdAt)}
                  totalWorkouts={session.workoutLogs?.length || 0}
                  totalWeight={calculateTotalWeight(session.workoutLogs)}
                  creator={session.creator.username}
                />
              ))}
            </div>
          ) : (
            <p>No sessions available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cards;
