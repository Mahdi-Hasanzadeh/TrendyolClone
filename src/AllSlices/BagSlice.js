import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../jsonServerURL";

const bagsURL = `${baseURL}bags`;

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
    if (!product.id) {
      // console.log(product);
      let checked = [];

      await product.map(async (item) => {
        const response = await axios.put(`${bagsURL}/${item.id}`, item);
        if (response.status === 200) {
          checked.push(true);
        } else {
          checked.push(false);
        }
      });
      // const response = await axios.put(`${bagsURL}/${product}`);
      return {
        state: checked.every((item) => item === true),
      };
    }

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
    console.log(error.message);
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
    // console.log(error);
    return {
      state: false,
      error: "networkError",
      message: error.message,
    };
  }
};

export const removeItemfromBagInDatabaseById = async (id) => {
  try {
    const response = await axios.delete(`${bagsURL}/${id}`);
    if (response.status === 200) {
      return {
        state: true,
        error: "",
        message: "Data Deleted",
      };
    } else {
      return {
        state: false,
        error: "Data not Deleted",
      };
    }
  } catch (error) {
    return {
      state: false,
      error: "netWorkError",
      message: error.message,
    };
  }
};
export const removeAllItemFromDatabase = async () => {
  try {
    const all = await axios.get(bagsURL);
    await all.data.map(async (item) => {
      setTimeout(async () => {
        await removeItemfromBagInDatabaseById(item.id);
        console.log(item.id);
      }, 2000);
    });
    return {
      state: true,
      error: "",
      message: "Data Deleted",
    };
  } catch (error) {
    return {
      state: false,
      error: "netWorkError",
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
    removeFromBagById: (state, action) => {
      state.Bag = state.Bag.filter(
        (item) => parseInt(item.id) !== parseInt(action.payload)
      );
    },
    removeAllFromBag: (state, action) => {
      state.Bag = [];
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

export const { addToBag, updateBag, removeFromBagById, removeAllFromBag } =
  BagSlice.actions;

export default BagSlice.reducer;
