import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    linkAnchor: null,
  },
  reducers: {
    setLink: (state, action) => {
      state.linkAnchor = action.payload;
    },
  },
});

const { actions, reducer } = tabsSlice;

export const { setLink } = actions;

export default reducer;
