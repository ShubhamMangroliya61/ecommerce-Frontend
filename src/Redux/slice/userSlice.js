import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";
import { ToasterType } from "../../Constants/ToasterType";
import { showToaster } from "../../utils/ToasterService";

const initialState = {
  userInfo: null,
  userOrder: [],
  isLoading: false,
  errorMess: null,
};

export function fecthLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3000/orders/?user.id=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export const fecthLoggedInUserAsync = createAsyncThunk(
  "user/fecthLoggedInUser",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/own");
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

export const fecthLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fecthLoggedInUserOrders",
  async ( thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/orders/own`);
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

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/users/${data.id}`, data);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthLoggedInUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthLoggedInUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(fecthLoggedInUserAsync.rejected, (state, action) => {
        showToaster(ToasterType.Error, action.payload.message);
        state.isLoading = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        showToaster(ToasterType.Success, action.payload.message);
        state.isLoading = false;
        state.userInfo = action.payload.data;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        showToaster(ToasterType.Error, action.payload.message);
        state.isLoading = false;
      })
      .addCase(fecthLoggedInUserOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrder = action.payload.data;
      })
      .addCase(fecthLoggedInUserOrdersAsync.rejected, (state, action) => {
        showToaster(ToasterType.Error, action.payload.message);
        state.isLoading = false;
      });
  },
});

export const {} = userSlice.actions;

export const selectOrders = (state) => state.user.userOrder;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
