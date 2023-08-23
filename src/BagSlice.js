import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bagsURL = "http://localhost:8000/bags";

export const fetchBags = createAsyncThunk(
  "Bags/fetchData",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(bagsURL);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBagToDatabase = async (product) => {
  try {
    const response = await axios.post(bagsURL, product);
    if (response.status === 201) {
      return {
        state: true,
        error: "recordAdded",
      };
    } else {
      return {
        state: false,
        error: "recordNotAdded",
      };
    }
  } catch (error) {
    return {
      state: false,
      error: "NetworkError",
      message: error.message,
    };
  }
};

export const updatingCountInProduct = async (product) => {
  try {
    const response = await axios.put(`${bagsURL}/${product.id}`, product);
    if (response.status === 200) {
      return {
        state: true,
        error: "dataUpdated",
      };
    } else {
      return {
        state: false,
        error: "not updated",
      };
    }
  } catch (error) {
    return {
      state: false,
      error: "networkError",
      message: error.message,
    };
  }
};

export const isProductExistInBag = async (id) => {
  try {
    const response = await axios.get(`${bagsURL}/${id}`);
    // console.log(response.status, "status");
    //   "5" === 5
    if (response.status === 200) {
      return {
        state: true,
        data: response.data,
        error: "dataExist",
      };
    } else {
      console.log("false");
      return {
        state: false,
        error: "dataNotExist",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      state: false,
      error: "networkError",
      message: error.message,
    };
  }
};

const BagSlice = createSlice({
  name: "Bags",
  initialState: {
    Bag: [],
    status: "idle",
    error: "",
  },
  reducers: {
    addToBag: (state, action) => {
      state.Bag.push(action.payload);
    },
    updateBag: (state, action) => {
      let product = state.Bag.find((item) => item.id === action.payload);
      product.count += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBags.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Bag = action.payload;
      })
      .addCase(fetchBags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // builder
    //   .addCase(addBagToDatabase.pending, (state, action) => {
    //     state.status = "loading";
    //   })
    //   .addCase(addBagToDatabase.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     // state.Bag = state.Bag.push(action.payload);
    //   })
    //   .addCase(addBagToDatabase, (state, action) => {
    //     state.status = "failed";
    //     // state.error = action.payload;
    //   });
  },
});

export const { addToBag, updateBag } = BagSlice.actions;

export default BagSlice.reducer;
