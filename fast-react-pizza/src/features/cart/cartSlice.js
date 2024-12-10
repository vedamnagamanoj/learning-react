import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: function (state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem: function (state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: function (state, action) {
      // payload = pizzaId;
      // const item = state.cart.find((item) => item.pizzaId === action.payload);
      // item.quantity++;
      // item.totalPrice = item.quantity * item.unitPrice;
      state.cart.forEach((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity++;
          item.totalPrice = item.quantity * item.unitPrice;
        }
      });
    },
    decreaseItemQuantity(state, action) {
      state.cart.forEach((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity--;
          item.totalPrice = item.quantity * item.unitPrice;
          if (item.quantity === 0)
            cartSlice.caseReducers.deleteItem(state, action);
        }
      });
    },
    clearCart: function (state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((result, item) => (result += item.quantity), 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((result, item) => (result += item.totalPrice), 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
