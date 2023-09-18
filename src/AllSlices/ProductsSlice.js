import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../jsonServerURL";

const productsURL = `${baseURL}products`;

export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(productsURL);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: "",
};
const ProductsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = action.payload;
        state.error = action.payload;
      });
  },
});

export default ProductsSlice.reducer;
