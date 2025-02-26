import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string;
  phone: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isProfileSetup: boolean;
  is_subscribed: boolean;
  subscriptionPlan: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isProfileSetup: false,
  is_subscribed: false,
  subscriptionPlan: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isProfileSetup = action.payload.isProfileSetup;
      state.is_subscribed = action.payload.is_subscribed;
      state.subscriptionPlan = action.payload.subscriptionPlan;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.user = null;
      state.isProfileSetup = false;
      state.is_subscribed = false;
      state.subscriptionPlan = null;
    },
  },
});


export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
