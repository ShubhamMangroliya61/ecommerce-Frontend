import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axioseInstance";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  selectProduct: null,
  totalItems: 0,
};
export function fetchProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/category");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/brand");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductByFilter(filter, sort, pagination) {
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
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllproduct",
  async () => {
    const response = await fetchProduct();
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchAllProductAsyncByFilter = createAsyncThunk(
  "product/fetchAllproductfilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductByFilter(filter, sort, pagination);
    return response.data;
  }
);
export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);
export const fetchBrandAsync = createAsyncThunk(
  "product/fetchBrand",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductAsyncByFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsyncByFilter.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.items;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProduct = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export default productSlice.reducer;
