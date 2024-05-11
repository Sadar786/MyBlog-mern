import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import ThemeReducer from './theme/ThemeSlice.js'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  theme: ThemeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Pass persistedReducer here, not persistReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Return the result of getDefaultMiddleware
});

export const persistore = persistStore(store); // Corrected typo, should be persistor not persistore
