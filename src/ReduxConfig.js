import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./ProductsSlice";
import MenProductSlice from "./MenCategorySlice";
import { MenSingleProduct } from "./MenCategorySlice";
import BagSlice from "./BagSlice";
export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    MenProducts: MenProductSlice,
    singleProduct: MenSingleProduct.reducer,
    Bag: BagSlice,
  },
});
