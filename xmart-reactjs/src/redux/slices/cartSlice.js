import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const itemExist = state.some((item) => item.rfid === action.payload.rfid);
      if (itemExist) {
        state = state.map((item) => {
          if (action.payload.rfid === item.rfid) {
            item.jumlah = item.jumlah + 1;
          }
          return item;
        });
      } else {
        state.push({ ...action.payload, jumlah: 1 });
      }
    },
    increaseItem(state, action) {
      state = state.map((item) => {
        if (action.payload === item.rfid) {
          item.jumlah = item.jumlah + 1;
        }
        return item;
      });
    },
    decreaseItem(state, action) {
      state = state.map((item) => {
        if (action.payload === item.rfid && item.jumlah > 1) {
          item.jumlah = item.jumlah - 1;
        }
        return item;
      });
    },
    removeItem(state, action) {
      return state.filter((item) => item.rfid !== action.payload);
    },
    clearCart(state, action) {
      return [];
    },
  },
});

export const { addToCart, increaseItem, decreaseItem, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
