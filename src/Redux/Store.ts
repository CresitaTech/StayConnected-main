import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import userReducer from './userslice';
import ProfileReducer from './ProfileSetupSlice'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth','profileSetup'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profileSetup: ProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
