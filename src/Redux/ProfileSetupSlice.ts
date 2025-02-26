import { createSlice } from '@reduxjs/toolkit';

interface ProfileSetupState {
  isSetupComplete: boolean;
}

const initialState: ProfileSetupState = {
  isSetupComplete: false, 
};

const profileSetupSlice = createSlice({
  name: 'profileSetup',
  initialState,
  reducers: {
    completeProfileSetup: (state) => {
      state.isSetupComplete = true;
    },
    clearProfileSetup: (state) => {
      state.isSetupComplete = false; 
    },
  },
});

export const { completeProfileSetup, clearProfileSetup } = profileSetupSlice.actions;
export default profileSetupSlice.reducer;
