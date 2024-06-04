import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productservices from "../Product/productServices";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  products: [],
};

export const addproduct = createAsyncThunk(
  "auth/add-product",
  async (product, thunkAPI) => {
    try {
      return await productservices.createProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productslice = createSlice({
    name: "product",
    initialState,
    extraReducers : (builder) => {
        builder
        .addCase(addproduct.pending , (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
        .addCase(addproduct.fulfilled , (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false
        })
        .addCase(addproduct.rejected , (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true
        })
    }
})



