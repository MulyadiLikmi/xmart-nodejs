import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./ItemSlice";
import cartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
  },
});

export default store;
