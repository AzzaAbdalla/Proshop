import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const selectedItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item._id === selectedItem._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === selectedItem._id ? selectedItem : item
        );
      } else state.cartItems = [...state.cartItems, selectedItem];

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
