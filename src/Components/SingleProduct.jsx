import { useLocation, useParams } from "react-router";
// import { GetProductById } from "./Products";
import { LoadingComponent } from "./components.js";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { BreadCrumbsLinks } from "./components";
import { fetchSingleProduct } from "../AllSlices/MenCategorySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  AssignmentReturned,
  CheckroomRounded,
  ExpandMoreRounded,
  FavoriteBorderRounded,
  LocalShippingRounded,
} from "@mui/icons-material";

import {
  addToBag,
  addBagToDatabase,
  isProductExistInBag,
  updatingCountInProduct,
  updateBag,
} from "../AllSlices/BagSlice.js";
import { PaymentMethod } from "./components.js";
import { toast } from "react-toastify";
import { priceAfterDiscount } from "../Utility/PriceDiscount.jsx";

const imageFolderPath = "./public/";

const SingleProduct = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const singleProduct = useSelector((store) => store.singleProduct);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log(location.pathname);

  const AddToBag = async () => {
    setButtonDisabled(true);
    let product = { ...singleProduct.singleProduct };
    const isProductExist = await isProductExistInBag(product.id);
    if (
      isProductExist.state === false &&
      isProductExist.message === "Network Error"
    ) {
      setButtonDisabled(false);
      // alert(isProductExist.message);
      toast.error(isProductExist.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }
    if (isProductExist.state) {
      // console.log("productCount", isProductExist.data);

      product = {
        ...isProductExist.data,
        count: isProductExist.data.count + 1,
      };

      const status = await updatingCountInProduct(product);
      if (status.state === false && status.error == "networkError") {
        setButtonDisabled(false);
        // alert(status.message);
        toast.error(status.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        return;
      }
      if (status.state) {
        toast.info(`${product.productName} is added to your bag`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        dispatch(updateBag(product.id));
      } else {
        // alert(status.error);
        toast.error(status.error, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        setButtonDisabled(false);
      }
    } else {
      product = { ...product, count: 1, checked: true };
      const status = await addBagToDatabase(product);
      if (status.state === false && status.error === "NetworkError") {
        // alert(status.message);
        toast.error(status.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        setButtonDisabled(false);
        return;
      }
      if (status.state) {
        // console.log("status: ", status);
        toast.info(`${product.productName} is added to your bag`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        dispatch(addToBag(product));
      } else {
        // alert(status.message);
        toast.error(status.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    }
    setButtonDisabled(false);
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [location.pathname]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          overflowX: "hidden",
        }}
      >
        {/* Breadcrumb Section */}
        <Box>
          <Breadcrumbs
            separator=">"
            sx={{
              mt: 1,
            }}
          >
            <BreadCrumbsLinks
              underline={"none"}
              to="/"
              LinkName={"Homepage"}
              isActive={false}
            />
            <BreadCrumbsLinks
              underline={"none"}
              to="/products/Men"
              LinkName={"Men Products"}
              isActive={false}
            />
            <BreadCrumbsLinks
              underline={"always"}
              to=""
              LinkName={singleProduct.singleProduct.productName}
              isActive={true}
            />
          </Breadcrumbs>
        </Box>
        {/* Single Product Section */}
        {singleProduct.status === "loading" ? (
          <LoadingComponent />
        ) : singleProduct.status === "failed" ? (
          <Typography variant="h5">{singleProduct.error}</Typography>
        ) : singleProduct.status === "succeeded" ? (
          <>
            <Box>
              <NavLink to={`/products/Men/${location.search}`}>
                <Button variant="text">Back</Button>
              </NavLink>
            </Box>

            <Stack
              spacing={3}
              direction={{ xs: "column", md: "row" }}
              mx={4}
              my={3}
              justifyContent={"center"}
              alignItems={{ xs: "center", md: "normal" }}
            >
              <Box
                sx={{
                  maxWidth: 300,
                  minWidth: 200,
                }}
                flex={5}
              >
                <Card
                  sx={{
                    maxWidth: 600,
                  }}
                >
                  <CardMedia
                    component={"img"}
                    image={`docs/${singleProduct.singleProduct.picture}`}
                  />
                </Card>
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={1} flex={5}>
                <Box>
                  <Typography display={"inline"} variant="h6">
                    {singleProduct.singleProduct.productName.toUpperCase()}{" "}
                  </Typography>
                  <Typography
                    display={"inline"}
                    noWrap
                    variant="body1"
                    color="gray"
                  >
                    {singleProduct.singleProduct.description}
                  </Typography>
                </Box>
                <Typography>
                  Rating {singleProduct.singleProduct.rating} / 5
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  fontStyle={"italic"}
                >
                  <span style={{ color: "grey", fontSize: "19px" }}>
                    Seller:
                  </span>{" "}
                  <span
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    Trendyol
                  </span>
                </Typography>
                <Typography variant="h5" color="black">
                  {priceAfterDiscount(
                    singleProduct.singleProduct.originalPrice,
                    singleProduct.singleProduct.discount
                  )}
                  {" $"}
                </Typography>
                <Divider />
                <Typography fontSize={"18px"} fontFamily={"monospace"}>
                  Color: {singleProduct.singleProduct.color.toUpperCase()}
                </Typography>
                <Typography fontSize={"18px"} fontFamily={"monospace"}>
                  Size: {singleProduct.singleProduct.size.toUpperCase()}
                </Typography>
                <Chip
                  icon={<CheckroomRounded color="warning" />}
                  label="We recommend buying your usual size."
                />
                <Box>
                  <Button
                    sx={{
                      width: "50%",
                    }}
                    variant="contained"
                    color="error"
                    disabled={buttonDisabled}
                    onClick={AddToBag}
                  >
                    ADD TO BAG
                  </Button>
                  <Button
                    sx={{
                      width: "50%",
                    }}
                    fullWidth
                    variant="text"
                  >
                    <FavoriteBorderRounded />
                  </Button>
                </Box>
                <PaymentMethod />

                <Box
                  sx={{
                    backgroundColor: "#f3f3f3",
                    display: "flex",
                    justifyContent: "space-around",
                    padding: 1,
                  }}
                >
                  <Box>
                    <Typography noWrap color="primary">
                      <LocalShippingRounded
                        sx={{
                          verticalAlign: "middle",
                          mr: 2,
                        }}
                      />
                      Free Shipping
                    </Typography>
                    <Typography variant="body2">Delivery by 31 Aug.</Typography>
                  </Box>
                  <Box>
                    <Typography noWrap color="green">
                      <AssignmentReturned
                        sx={{
                          verticalAlign: "middle",
                          mr: 2,
                        }}
                      />
                      Free returns
                    </Typography>
                    <Typography variant="body2">
                      Easy and free return in 30 days
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box display={{ xs: "none", md: "block" }} flex={2}>
                <Box
                  sx={{
                    border: "0.005px solid gray",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      color: "black",
                    }}
                  >
                    Similar items
                    <ExpandMoreRounded
                      sx={{
                        ml: "auto",
                      }}
                    />
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      color: "black",
                    }}
                  >
                    You might also like
                    <ExpandMoreRounded
                      sx={{
                        ml: "auto",
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            </Stack>
          </>
        ) : (
          <Typography variant="h5">{singleProduct.error}</Typography>
        )}
      </Container>
    </>
  );
};

export default SingleProduct;
