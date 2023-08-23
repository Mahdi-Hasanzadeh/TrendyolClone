import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const menProductsURL = "http://localhost:8000/MenCategory/";

export const fetchMenProducts = createAsyncThunk(
  "menProducts/fetchData",
  async (filter, { rejectWithValue }) => {
    try {
      console.log("value: ", filter);
      if (filter.id) {
        const response = await axios.get(`${menProductsURL}/${filter.id}`);
        if (response.status == 200) {
          console.log(response.data);
          return response.data;
        }
      } else {
        let searchParams = "/?";
        console.log(searchParams);
        if (filter.sizeValue !== "All Sizes") {
          searchParams += `size=${filter.sizeValue.toLowerCase()}`;
          console.log(searchParams, "searchParams");
        }
        if (filter.colorValue !== "All Colors") {
          searchParams += `&color=${filter.colorValue.toLowerCase()}`;
        }
        const response = await axios.get(`${menProductsURL}${searchParams}`);
        if (response.status === 200) {
          console.log("men: ", response.data);

          return response.data;
        }
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${menProductsURL}${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  menProducts: [],
  status: "idle",
  error: "",
};

const MenProductSlice = createSlice({
  name: "menProducts",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMenProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMenProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menProducts = action.payload;
      })
      .addCase(fetchMenProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const MenSingleProduct = createSlice({
  name: "singleProduct",
  initialState: {
    singleProduct: {},
    status: "idle",
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default MenProductSlice.reducer;
