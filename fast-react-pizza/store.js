import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/features/users/userSlice';
import cartReducer from './src/features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
