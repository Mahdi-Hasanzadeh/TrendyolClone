import {
  HelpSection,
  Navbar,
  Categories,
  AllCard,
  SingleProduct,
  MenCategory,
  Bag,
} from "./Components/components.js";

import { Routes, Route, Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <HelpSection />
      <Navbar />
      <Categories />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<AllCard />} />
          <Route path="products" element={<AllCard />} />
          <Route path="/products/:category" element={<MenCategory />} />
          <Route
            path="/products/:category/products/:productId"
            element={<SingleProduct />}
          />
          <Route path="/cart" element={<Bag />} />
          <Route path="/womenProducts" element={<AllCard />} />
          <Route path="/womenProducts/:category" element={<MenCategory />} />
          <Route path="*" element={<h2>Not found</h2>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
