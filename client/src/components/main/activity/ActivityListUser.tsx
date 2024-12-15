import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ActivityContent from "./ActivityContent";
import { WorkoutLog } from "../../../store/workout/workoutSlice";

interface WorkoutSession {
  creator: {
    _id: string;
    username: string;
  };
  createdAt: string;
  workoutLogs: WorkoutLog[];
}

const ActivityListUser = () => {
  const [listSessions, setListSessions] = useState<WorkoutSession[]>([]);
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
          "http://localhost:3000/graphql",
          requestBody,
          {
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (response.status === 200) {
          setListSessions(response.data.data.getWorkoutSessions);
        } else {
          setError("Failed to fetch sessions: " + response.statusText);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error("Axios error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const formatDate = (dateStr: string): string => {
    const date = new Date(Number(dateStr));
    return !isNaN(date.getTime()) ? format(date, "dd. MMM yyyy - HH:mm") : "";
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {listSessions.length > 0 ? (
        <div className="flex flex-col gap-3">
          {listSessions.map((session, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm font-medium flex justify-between">
                <p>{formatDate(session.createdAt)}</p>
              </div>
              <div className="collapse-content">
                <ActivityContent logs={session.workoutLogs} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No sessions available.</p>
      )}
    </>
  );
};

export default ActivityListUser;
