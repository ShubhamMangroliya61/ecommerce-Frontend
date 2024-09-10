import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";
import { ToasterType } from "../../Constants/ToasterType";
import { showToaster } from "../../utils/ToasterService";

const initialState = {
  orders: [],
  status: "idle",
  CurrentOrder: null,
  totalOrder: 0,
};

export const createOrderAsync = createAsyncThunk(
  "orders/createOrder",
  async (order, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/orders`, order);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetchAllOrder",
  async ({ sort, pagination }, thunkAPI) => {
    try {
      let queryString = "";
      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }
      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }
      const response = await axiosInstance.get(`/orders?${queryString}`);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateOrdersAsync = createAsyncThunk(
  "orders/updateOrder",
  async (order, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/orders/${order.id}`,order);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
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
        showToaster(ToasterType.Success, action.payload.message);
        state.status = "idle";
        state.orders.push(action.payload.data);
        state.CurrentOrder = action.payload.data;
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data.orders;
        state.totalOrder = action.payload.data.totalOrders;
      })
      .addCase(updateOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrdersAsync.fulfilled, (state, action) => {
        showToaster(ToasterType.Success, action.payload.message);
        state.status = "idle";
        const index = state.orders.findIndex(
          (item) => item.id === action.payload.data.id
        );
        state.orders[index] = action.payload.data;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;
export const selectTotalOrder = (state) => state.order.totalOrder;
export const selectCurrentOrder = (state) => state.order.CurrentOrder;

export default orderSlice.reducer;
