import { createSlice } from "@reduxjs/toolkit";

const scrollToHomepage = createSlice({
  name: "scrollToHomepage",
  initialState: {
    scrollY: 0,
  },
  reducers: {
    updateScrollValue: (state, action) => {
      console.log("slice  ", action.payload);
      state.scrollY = action.payload;
    },
  },
});

export const { updateScrollValue } = scrollToHomepage.actions;
export default scrollToHomepage.reducer;
