import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axioseInstance';

const initialState = {
  userInfo: null,
  userOrder:[],
  status: 'idle',
};
export function fecthLoggedInUser(userId) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3000/users/"+userId);
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
  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:3000/users/"+update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    });
  }

export const fecthLoggedInUserAsync = createAsyncThunk(
  'user/fecthLoggedInUser',
  async (userId) => {
    const response = await fecthLoggedInUser(userId);
    return response.data;
  }
);

export const fecthLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fecthLoggedInUserOrders',
    async (userId) => {
      const response = await fecthLoggedInUserOrders(userId);
      return response.data;
    }
  );

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    const response = await updateUser(data);
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
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
  },
});

export const {  } = userSlice.actions;

export const selectOrders = (state) => state.user.userOrder;
export const selectUserInfo = (state) => state.user.userInfo;


export default userSlice.reducer;