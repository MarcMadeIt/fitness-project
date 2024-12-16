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

const graphqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://staystrong.vercel.app/graphql"
    : "http://localhost:3000/graphql";

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
        const response = await axios.post(graphqlEndpoint, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (
          response.status === 200 &&
          response.data.data?.getAllWorkoutSessions
        ) {
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
      {loading && (
        <span className="loading loading-dots loading-lg mt-10"></span>
      )}
      {!loading && !error && listSessions.length === 0 && (
        <p>No sessions available.</p>
      )}
      {!loading && error && <p>{error}</p>}
      {!loading && listSessions.length > 0 && (
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
      )}
    </>
  );
};

export default ActivityListAll;
