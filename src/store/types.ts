import store from './index'; // Import the store from the index file

export interface RootState {
  trip: {
    tripId: string | null;
  };
}

export type AppDispatch = typeof store.dispatch; // Define AppDispatch type based on the store
