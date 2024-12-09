import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  token: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showLoginModal: boolean; // State for controlling the modal visibility
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  showLoginModal: false, // Modal is hidden initially
};

// Check if token exists in localStorage
const storedToken = localStorage.getItem('token');

// Initialize state based on token presence
const initialState = storedToken
  ? { isAuthenticated: true, user: { token: storedToken }, showLoginModal: false }
  : initialAuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token); 
      state.showLoginModal = false; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token'); 
      state.showLoginModal = false;
    },
    showLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload;
    },
  },
});

export const { login, logout, showLoginModal } = authSlice.actions;
export default authSlice.reducer;
