import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsSidebarOpen(state, { payload }: PayloadAction<boolean>) {
      state.isSidebarOpen = payload;
    },
  },
});

export default layoutSlice.reducer;
export const actions = layoutSlice.actions;
