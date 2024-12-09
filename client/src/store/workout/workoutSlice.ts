import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Workout {
  id: number;
  workoutType?: string;
  isOpen: boolean;
}

interface WorkoutState {
  workouts: Workout[];
  workoutType: string;
  weight: number | null;
  sets: number | null;
  repetitions: number | null;
}

const initialState: WorkoutState = {
  workouts: [{ id: 1, isOpen: true }],
  workoutType: '',
  weight: null,
  sets: null,
  repetitions: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkoutType(state, action: PayloadAction<string>) {
      state.workoutType = action.payload;
    },
    setWeight(state, action: PayloadAction<number | null>) {
      state.weight = action.payload ?? 0;
    },
    setSets(state, action: PayloadAction<number | null>) {
      state.sets = action.payload ?? 0;
    },
    setRepetitions(state, action: PayloadAction<number | null>) {
      state.repetitions = action.payload ?? 0;
    },
    addNewWorkout(state) {
      const newWorkout = { id: state.workouts.length + 1, isOpen: true };
      state.workouts.push(newWorkout);
    },
    saveWorkout(state, action: PayloadAction<{ id: number; workoutType: string }>) {
      const { id, workoutType } = action.payload;
      const workout = state.workouts.find(workout => workout.id === id);
      if (workout) {
        workout.workoutType = workoutType;
        workout.isOpen = false;
      }
    },
    toggleWorkoutVisibility(state, action: PayloadAction<number>) {
      const workout = state.workouts.find(workout => workout.id === action.payload);
      if (workout) {
        workout.isOpen = !workout.isOpen;
      }
    },
    completeWorkout(state, action: PayloadAction<number>) {
      state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
    },
    resetSession(state) {
      state.workouts = [{ id: 1, isOpen: true }];
      state.workoutType = '';
      state.weight = null;
      state.sets = null;
      state.repetitions = null;
    },
  },
});

export const { 
  setWorkoutType, 
  setWeight, 
  setSets, 
  setRepetitions, 
  addNewWorkout, 
  saveWorkout, 
  toggleWorkoutVisibility, 
  completeWorkout, 
  resetSession 
} = workoutSlice.actions;

export default workoutSlice.reducer;
