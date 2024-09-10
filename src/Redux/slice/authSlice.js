import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";
import { useSelector } from "react-redux";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../Constants/ToasterType";

const initialState = {
  loggedInUser: null,
  isLoading: false,
  errorMess: null,
};

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
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
});
export const createUserAsync = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
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
export const signOutAsync = createAsyncThunk("user/signOut", async (data) => {
  const response = await signOut(data);
  return response.data;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        showToaster(ToasterType.Success, action.payload.message);
        state.isLoading = false;
        state.loggedInUser = action.payload.data;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        showToaster(ToasterType.Error, action.payload.message);
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        showToaster(ToasterType.Success, action.payload.message);
        state.isLoading = false;
        state.loggedInUser = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        showToaster(ToasterType.Error, action.payload.message);
        state.isLoading = false;
        state.errorMess = action.payload.message;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUser = null;
      });
  },
});

export const {} = authSlice.actions;

export const useSelectorAuthState = () => {
  return useSelector((state) => state.auth);
};

export default authSlice.reducer;
