import { configureStore } from "@reduxjs/toolkit";

import { MenSingleProduct } from "./AllSlices/MenCategorySlice";

import {
  BagSlice,
  MenProductSlice,
  NewestProducts,
  ProductsSlice,
  scrollToHomepage,
} from "./AllSlices/AllSlice.js";
export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    MenProducts: MenProductSlice,
    singleProduct: MenSingleProduct.reducer,
    Bag: BagSlice,
    NewestProducts: NewestProducts,
    scrollToHomepage,
  },
});
