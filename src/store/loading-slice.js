import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  loadingMsg: "textures model",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMsg(state, action) {
      state.loadingMsg = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
