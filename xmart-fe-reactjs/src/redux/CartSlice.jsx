import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.rfid === action.payload.rfid
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.hargaSatuan;
    },
    removeItemFromCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.rfid === action.payload.rfid
      );
      if (existingItem) {
        state.total -= existingItem.hargaSatuan * existingItem.quantity;
        state.items = state.items.filter(
          (item) => item.rfid !== action.payload.rfid
        );
      }
    },
    updateItemQuantity(state, action) {
      const existingItem = state.items.find(
        (item) => item.rfid === action.payload.rfid
      );
      if (existingItem) {
        state.total -= existingItem.hargaSatuan * existingItem.quantity;
        existingItem.quantity = action.payload.quantity;
        state.total += existingItem.hargaSatuan * existingItem.quantity;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
