import { combineReducers } from 'redux';

// Define action types
const SET_TRIP_ID = 'SET_TRIP_ID';

// Action creator for setting trip_id
export const setTripId = (tripId: string | null) => ({
  type: SET_TRIP_ID,
  payload: tripId,
});

// Initial state type
interface TripState {
  tripId: string | null;
}

// Initial state
const initialState: TripState = {
  tripId: null,
};

// Reducer
const tripReducer = (
  state = initialState,
  action: { type: string; payload?: string | null },
) => {
  switch (action.type) {
    case SET_TRIP_ID:
      return { ...state, tripId: action.payload };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  trip: tripReducer,
});

export default rootReducer;
