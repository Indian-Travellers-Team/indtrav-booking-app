import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { RootState } from './types'; // Import RootState type

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch; // Export AppDispatch type
export type { RootState }; // Export RootState type
export default store;
