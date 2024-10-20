// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage
import { RootState } from './types'; // Import RootState type

const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage engine (localStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  devTools: process.env.NODE_ENV !== 'production',
});

// Create a persistor
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch; // Export AppDispatch type
export type { RootState }; // Export RootState type
export default store;
