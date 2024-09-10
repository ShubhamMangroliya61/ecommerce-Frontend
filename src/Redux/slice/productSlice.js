import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../Constants/ToasterType";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  selectProduct: null,
  totalItems: 0,
};

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
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

export const fetchAllProductAsyncByFilter = createAsyncThunk(
  "product/fetchAllproductfilter",
  async ({ filter, sort, pagination, admin }, thunkAPI) => {
    try {
      let queryString = "";
      for (let key in filter) {
        queryString += `${key}=${filter[key]}&`;
      }
      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }
      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }
      if (admin) {
        queryString += `admin=true`;
      }
      const response = await axiosInstance.get(`/products?${queryString}`);
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

export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/categories");
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

export const fetchBrandAsync = createAsyncThunk(
  "product/fetchBrand",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/brands");
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

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/products`, data);
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

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/products/${data.id}`, data);
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
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsyncByFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsyncByFilter.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data.products;
        state.totalItems = action.payload.data.totalProducts;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.data;
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload.data;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectProduct = action.payload.data;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        showToaster(ToasterType.Success, action.payload.message);
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        showToaster(ToasterType.Success, action.payload.message);
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProduct = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export default productSlice.reducer;
