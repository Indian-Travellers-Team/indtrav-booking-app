// src/store/reducers.ts
import { combineReducers } from 'redux';

// Define action types
const SET_TRIP_ID = 'SET_TRIP_ID';

// Initial state type
interface TripState {
  tripId: string | null;
}

// Action creator for setting trip_id
export const setTripId = (tripId: string | null) => ({
  type: SET_TRIP_ID,
  payload: tripId,
});

// Initial state
const initialState: TripState = {
  tripId: null, // tripId should start as null
};

// Reducer
const tripReducer = (
  state = initialState,
  action: { type: string; payload?: string | null },
): TripState => {
  switch (action.type) {
    case SET_TRIP_ID:
      // Only update tripId if action.payload is not undefined
      if (action.payload !== undefined) {
        return { ...state, tripId: action.payload }; // Update tripId
      }
      return state; // Return the current state if payload is undefined
    default:
      return state; // Always return the current state if no action matches
  }
};

// Combine reducers
const rootReducer = combineReducers({
  trip: tripReducer,
});

export default rootReducer;
