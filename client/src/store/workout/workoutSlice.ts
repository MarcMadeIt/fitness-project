import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitWorkoutSession } from "./workoutThunks";
import { RootState } from "../store";
import { createSelector } from 'reselect';

export interface WorkoutType {
  _id: string;
  name: string;
}

export interface WorkoutLog {
   _id?: string; 
  workoutType: WorkoutType;
  weight: number | null;
  sets: number | null;
  reps: number | null;
  creator: string | null;
}

export interface Workout {
  id: number;
  isOpen: boolean;
  name: string; 
  workoutType?: string;  
  workoutTypeName?: string; 
  weight?: number | null;
  sets?: number | null;
  reps?: number | null;
  creator?: string;
}

interface WorkoutState {
  currentWorkoutLogs: WorkoutLog[];
  workouts: Workout[];
  completedSessions: {
    logs: WorkoutLog[];
  }[];
  workoutTypes: { _id: string; name: string }[]; 
}

const initialState: WorkoutState = {
  currentWorkoutLogs: [],
  workouts: [{ id: 0, isOpen: true, name: "Add Workout" }],
  completedSessions: [],
  workoutTypes: [], 
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkoutLog(
      state,
      action: PayloadAction<{
        _id?: string;
        workoutType: WorkoutType; 
        weight: number | null;
        sets: number | null;
        reps: number | null;
        creator: string | null;
      }>
    ) {
      state.currentWorkoutLogs.push(action.payload);
    },
    resetCurrentWorkout(state) {
      state.currentWorkoutLogs = [];
      state.workouts = [{ id: 0, isOpen: true, name: "Add Workout" }];
    },
    addWorkout(
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) {
      // Only update the last "Add Workout" collapsible with the new workout name
      const lastWorkout = state.workouts[state.workouts.length - 1];
      if (lastWorkout && lastWorkout.name === "Add Workout") {
        lastWorkout.name = action.payload.name;
        lastWorkout.isOpen = false;
      }
    
      state.workouts.push({
        id: action.payload.id + 1, 
        name: "Add Workout",
        isOpen: true, 
      });
    },
    toggleWorkout(state, action: PayloadAction<number>) {
      state.workouts.forEach((workout) => {
        workout.isOpen = workout.id === action.payload;
      });
    },
    updateWorkoutData(
      state,
      action: PayloadAction<{
        id: number;
        workoutType?: string;
        workoutTypeName?: string;
        weight?: number | null;
        sets?: number | null;
        reps?: number | null;
        creator?: string;
      }>
    ) {
      const workout = state.workouts.find((w) => w.id === action.payload.id);
      if (workout) {
        if (action.payload.workoutType !== undefined) {
          workout.workoutType = action.payload.workoutType; 
        }
        if (action.payload.workoutTypeName !== undefined) {
          workout.workoutTypeName = action.payload.workoutTypeName;
        }
        if (action.payload.weight !== undefined) {
          workout.weight = action.payload.weight;
        }
        if (action.payload.sets !== undefined) {
          workout.sets = action.payload.sets;
        }
        if (action.payload.reps !== undefined) {
          workout.reps = action.payload.reps;
        }
      }
    },
    setWorkoutTypes(state, action: PayloadAction<{ _id: string; name: string }[]>) {
      state.workoutTypes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitWorkoutSession.fulfilled, (state, action) => {
      state.completedSessions.push({
        logs: action.payload.workoutLogs,
      });
      state.currentWorkoutLogs = [];
      state.workouts = [{ id: 0, isOpen: true, name: "Add Workout" }];
    });
  },
});

export const totalAmount = createSelector(
  (state: RootState) => state.workout.currentWorkoutLogs,
  (currentWorkoutLogs) => {
    const totalWeight = currentWorkoutLogs.reduce((sum, log) => {
      const weight = log.weight ?? 0;
      const sets = log.sets ?? 0;
      const reps = log.reps ?? 0;
      return sum + weight * sets * reps;
    }, 0);

    const totalSets = currentWorkoutLogs.reduce(
      (sum, log) => (log.sets ? sum + log.sets : sum),
      0
    );

    return { totalWeight, totalSets };
  }
);


export const {
  addWorkoutLog,
  resetCurrentWorkout,
  addWorkout,
  toggleWorkout,
  updateWorkoutData,
  setWorkoutTypes, 
} = workoutSlice.actions;

export default workoutSlice.reducer;
