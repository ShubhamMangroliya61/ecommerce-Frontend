import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axioseInstance';

const initialState = {
  userInfo: null,
  userOrder:[],
  status: 'idle',
};
export function fecthLoggedInUser(userId) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3000/users"+userId);
      const data = await response.json();
      resolve({ data });
    });
  }

  export function fecthLoggedInUserOrders(userId) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3000/orders/?user.id="+userId);
      const data = await response.json();
      resolve({ data });
    });
  }
export const fecthLoggedInUserAsync = createAsyncThunk(
  'counter/fecthLoggedInUser',
  async (userId) => {
    const response = await fecthLoggedInUser(userId);
    return response.data;
  }
);

export const fecthLoggedInUserOrdersAsync = createAsyncThunk(
    'counter/fecthLoggedInUserOrders',
    async (userId) => {
      const response = await fecthLoggedInUserOrders(userId);
      return response.data;
    }
  );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fecthLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder = action.payload;
      });
  },
});

export const {  } = userSlice.actions;

export const selectOrders = (state) => state.user.userOrder;

export default userSlice.reducer;