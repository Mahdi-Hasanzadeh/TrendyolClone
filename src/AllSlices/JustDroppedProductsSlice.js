import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../jsonServerURL";

const NewestProductsURL = `${baseURL}newestProducts`;

export const fetchNewestProducts = createAsyncThunk(
  "Products/NewestProducts",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(NewestProductsURL);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const NewestProducts = createSlice({
  name: "NewestProducts",
  initialState: {
    products: [],
    status: "idle",
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNewestProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNewestProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchNewestProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default NewestProducts.reducer;
