import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WorkoutLog } from "./workoutSlice";

const getTokenFromStorage = () => {
  return localStorage.getItem("token");
};

export const submitWorkoutSession = createAsyncThunk(
  "workout/submitWorkoutSession",
  async ({
    userId,
    workoutLogs,
  }: {
    userId: string;
    workoutLogs: WorkoutLog[];
  }) => {
    const graphqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://staystrong.vercel.app/graphql"
    : "http://localhost:3000/graphql";

    const token = getTokenFromStorage();
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    try {
      const workoutLogIds = await Promise.all(
        workoutLogs.map(async (log) => {
          const logQuery = {
            query: `
              mutation {
                createWorkoutLog(
                  workoutLogInput: {
                    workoutTypeId: "${log.workoutType._id}",  
                    weight: ${log.weight},
                    sets: ${log.sets},
                    reps: ${log.reps},
                    creator: "${userId}"
                  }
                ) {
                  _id
                }
              }
            `,
          };

          const response = await axios.post(graphqlEndpoint, logQuery, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          });

          if (!response.data || response.data.errors) {
            throw new Error("Failed to create workout log");
          }

          return response.data.data.createWorkoutLog._id;
        })
      );

      const sessionQuery = {
        query: `
          mutation {
            createWorkoutSession(
              workoutSessionInput: {
                creator: "${userId}",
                workoutLogIds: [${workoutLogIds.map((id) => `"${id}"`)}]
              }
            ) {
              _id
            }
          }
        `,
      };

      const sessionResponse = await axios.post(graphqlEndpoint, sessionQuery, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
      });

      if (!sessionResponse.data || sessionResponse.data.errors) {
        throw new Error("Failed to create workout session");
      }

      return sessionResponse.data.data.createWorkoutSession;
    } catch (error) {
      console.error("Error submitting workout session:", error);
      throw error;
    }
  }
);
