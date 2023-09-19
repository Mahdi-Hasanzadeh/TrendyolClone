import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { ProductCard, LoadingComponent } from "./components.js";
// import { products } from "./Products.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../AllSlices/ProductsSlice.js";
import { fetchNewestProducts } from "../AllSlices/JustDroppedProductsSlice.js";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { Link } from "react-router-dom";
import { updateScrollValue } from "../AllSlices/ScrollSlice.js";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const AllCard = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector((store) => store.products);
  const newestProducts = useSelector((store) => store.NewestProducts);
  const scroll = useSelector((store) => store.scrollToHomepage);
  // console.log("All cards", myProducts);
  const path = "../assets/";

  const [activeStep, setActiveStep] = useState(0);
  const handleStepChange = (item) => {
    setActiveStep(item);
  };

  const SwipeableProducts = () => {
    return (
      <AutoPlaySwipeableViews
        index={activeStep}
        axis="x"
        onChangeIndex={handleStepChange}
        enableMouseEvents={true}
      >
        {newestProducts.products.map((item, i) => {
          return (
            <Box
              key={i}
              sx={{
                width: "300px",
                margin: "0 auto",
                borderRadius: "5px",
              }}
              overflow={"hidden"}
            >
              <Link to={`products/Men/products/${item.id}`}>
                <CardMedia
                  component={"img"}
                  image={`/TrendyolClone/${item.picture}`}
                  width="100%"
                  sx={{
                    objectFit: "contain",
                  }}
                />
              </Link>
            </Box>
          );
        })}
      </AutoPlaySwipeableViews>
    );
  };

  const ErrorSection = ({ error }) => {
    return (
      <Typography
        variant="h5"
        sx={{
          mt: 5,
        }}
      >
        {error}
      </Typography>
    );
  };

  // console.log(scroll.scrollY, "first render scrool");

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchNewestProducts());
    dispatch(updateScrollValue(0));
  }, [dispatch]);
  return (
    <>
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
            <ErrorSection error={myProducts.error} />
          )}
        </Grid>
      </Box>

      <Box sx={{ mx: 2, flexGrow: 1, justifyContent: "center", mb: 4 }}>
        {newestProducts.status === "loading" ? (
          <LoadingComponent />
        ) : newestProducts.status === "succeeded" ? (
          <>
            <Box mx={4} my={1}>
              Just dropped
            </Box>
            <SwipeableProducts />
          </>
        ) : (
          <ErrorSection error={newestProducts.error} />
        )}
      </Box>
    </>
  );
};

export default AllCard;
