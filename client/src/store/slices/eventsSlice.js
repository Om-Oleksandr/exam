import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
  },
  reducers: {
    addEvent (state, action) {
      state.events.push(action.payload);
      // state.events.sort((event1, event2) => event1.date - event2.date);
    },
    getEvents (state, action) {
      state.events = action.payload;
    },
    setAlert (state, action) {
      state.events.forEach(event => {
        if (event.id === action.payload) {
          event.alert = true;
        }
      });
    },
    markRead (state, action) {
      state.events.forEach(event => {
        if (event.alert === true) {
          event.isRead = true;
          event.alert = false;
        }
      });
    },
    removeEvent (state, action) {
      const newEvents = state.events.filter(
        event => event.id !== action.payload
      );
      state.events = newEvents;
    },
  },
});

export const {
  reducer,
  actions: { addEvent, getEvents, setAlert, markRead, removeEvent },
} = eventsSlice;

export default reducer;
