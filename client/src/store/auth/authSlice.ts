import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  userId: string;
  username: string;
  exp: number;
}

interface User {
  token: string;
  userId: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showLoginModal: boolean;
}

const getTokenFromStorage = (): string | null => {
  return localStorage.getItem("token");
};

const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp * 1000 > Date.now()) {
      return decoded;
    } else {
      localStorage.removeItem("token");
      return null;
    }
  } catch {
    return null;
  }
};

const token = getTokenFromStorage();
const decodedToken = token ? decodeToken(token) : null;

const initialState: AuthState = {
  isAuthenticated: !!decodedToken,
  user: decodedToken && token 
    ? {
        token, 
        userId: decodedToken.userId,
        username: decodedToken.username,
      }
    : null,
  showLoginModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      const decodedToken = decodeToken(token);

      if (decodedToken) {
        state.isAuthenticated = true;
        state.user = {
          token,
          userId: decodedToken.userId,
          username: decodedToken.username,
        };
        localStorage.setItem("token", token);
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      state.showLoginModal = false;
    },

    showLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload;
    },
  },
});

export const { login, logout, showLoginModal } = authSlice.actions;
export default authSlice.reducer;
