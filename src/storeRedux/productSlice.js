import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_PRODUCTS_ENDPOINT, FETCH_PRODUCTS_ENDPOINT } from "../config";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetch products");
      const response = await fetch(FETCH_PRODUCTS_ENDPOINT);
      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      console.log("resData", resData);
      return resData;
    } catch (error) {
      return rejectWithValue(
        error.message || "Could not fetch products, try again"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(UPDATE_PRODUCTS_ENDPOINT, {
        method: "PUT",
        body: JSON.stringify({ newProduct: product }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update products");
    }
  }
);

const initialState = {
  items: [],
  error: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Casos para addProduct
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const productActions = productSlice.actions;
const productReducer = productSlice.reducer;

export { productActions };

export default productReducer;
