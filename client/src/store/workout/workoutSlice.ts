import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkoutState {
  workoutType: string;
  weight: number | null;
  sets: number | null;
  repetitions: number | null;
}

const initialState: WorkoutState = {
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
    setWeight(state, action: PayloadAction<number>) {
      state.weight = action.payload;
    },
    setSets(state, action: PayloadAction<number>) {
      state.sets = action.payload;
    },
    setRepetitions(state, action: PayloadAction<number>) {
      state.repetitions = action.payload;
    },
    resetWorkout(state) {
      state.workoutType = '';
      state.weight = null;
      state.sets = null;
      state.repetitions = null;
    },
  },
});

export const { setWorkoutType, setWeight, setSets, setRepetitions, resetWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
