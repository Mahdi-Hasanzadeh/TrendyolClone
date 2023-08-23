import { Box, Grid, Typography } from "@mui/material";
import { ProductCard, LoadingComponent } from "./components.js";
// import { products } from "./Products.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "../ProductsSlice.js";
const AllCard = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector((store) => store.products);
  console.log("All cards", myProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Box display="flex" mx={4} my={1} justifyContent={"space-around"}>
      <Grid container spacing={2}>
        {myProducts.status === "loading" ? (
          <LoadingComponent />
        ) : myProducts.status === "succeeded" ? (
          myProducts.products.map((product) => {
            return (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={6}
                justifyContent={"center"}
              >
                <ProductCard product={product} />
              </Grid>
            );
          })
        ) : (
          <Typography
            variant="h5"
            sx={{
              mt: 5,
            }}
          >
            {myProducts.error}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AllCard;
