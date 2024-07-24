import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {},
  reducers: {
    setCustomer(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    clearCustomer(state, action) {
      state = {};
    },
  },
});

export const { setCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
