import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { WorkoutLog } from "../../../store/workout/workoutSlice";
import ActivityContent from "./ActivityContent";

interface WorkoutSession {
  creator: {
    _id: string;
    username: string;
  };
  createdAt: string;
  workoutLogs: WorkoutLog[];
}

const ActivityListAll = () => {
  const [listSessions, setListSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      const requestBody = {
        query: `
          query {
            getAllWorkoutSessions {
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
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (
          response.status === 200 &&
          response.data.data?.getAllWorkoutSessions
        ) {
          // Sørg for, at data er i det format, du forventer
          setListSessions(response.data.data.getAllWorkoutSessions || []);
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
    return !isNaN(date.getTime()) ? format(date, "dd. MMM yyyy") : "";
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {listSessions.length > 0 ? (
        <div className="flex flex-col gap-3">
          {listSessions.map((session, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200 z-0"
            >
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm font-medium flex justify-between">
                <p>{formatDate(session.createdAt)}</p>

                <p className="text-primary">@{session.creator.username}</p>
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

export default ActivityListAll;
