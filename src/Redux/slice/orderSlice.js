import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";

const initialState = {
  orders: [],
  status: "idle",
  CurrentOrder: null,
};

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export const createOrderAsync = createAsyncThunk(
  "orders/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.CurrentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.CurrentOrder = action.payload;
      });
  },
});

export const {resetOrder} = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.CurrentOrder;

export default orderSlice.reducer;
