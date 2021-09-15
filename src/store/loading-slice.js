import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  loadingMsgs: [],
  completeds: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMsg(state, action) {
      const msg = action.payload;
      if (msg.split(" ").pop() === "done") state.completeds++;
      state.loadingMsgs.push(msg);
      if (state.completeds > 1) state.loadingMsgs.push("Loaded successfully");
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
