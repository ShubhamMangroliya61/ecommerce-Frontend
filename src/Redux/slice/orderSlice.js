import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";

const initialState = {
  orders: [],
  status: "idle",
  CurrentOrder: null,
  totalOrder:0,
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
export function fetchAllOrder(sort,pagination) {
  let queryString = "";
    for (let key in sort) {
     queryString += `${key}=${sort[key]}&`;
   }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders?" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders/" + order.id, {
      method: "PATCH",
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
export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetchAllOrder",
  async ({sort, pagination}) => {
    const response = await fetchAllOrder(sort,pagination);
    return response.data;
  }
);
export const updateOrdersAsync = createAsyncThunk(
  "orders/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
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
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.totalOrder = action.payload.items;
      })
      .addCase(updateOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (item) => item.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;
export const selectTotalOrder = (state) => state.order.totalOrder;
export const selectCurrentOrder = (state) => state.order.CurrentOrder;

export default orderSlice.reducer;
