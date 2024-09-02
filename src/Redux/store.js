import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/productSlice';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import orderReducer from './slice/orderSlice';
import userReducer from './slice/userSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer
  },
});
