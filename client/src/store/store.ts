import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import workoutReducer from './workout/workoutSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

export default store;
