import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, PaymentMethod, BagProduct } from "./components";
import { useEffect, useState } from "react";
import {
  fetchBags,
  removeFromBagById,
  removeItemfromBagInDatabaseById,
  removeAllFromBag,
  removeAllItemFromDatabase,
} from "../AllSlices/BagSlice";
import {
  AutoDeleteRounded,
  Delete,
  Discount,
  Error,
  LocalShippingRounded,
  SentimentDissatisfiedRounded,
} from "@mui/icons-material";

import { updatingCountInProduct } from "../AllSlices/BagSlice";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { priceAfterDiscount } from "../Utility/PriceDiscount";

const networkError = "Network Error";
const removeAll = "removeAll";

const Bag = () => {
  const dispatch = useDispatch();

  const Bag = useSelector((store) => store.Bag);

  const [disabledCheckBox, setDisabledCheckBox] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [product, setProduct] = useState(null);

  //#region private functions

  const handleOpenDialog = (item) => {
    if (item === removeAll) {
      setProduct(removeAll);
      setOpenDialog((prevData) => !prevData);
      return;
    }
    setProduct(item);
    setOpenDialog((prevData) => !prevData);
  };

  const ClearAllProducts = async () => {
    const state = await removeAllItemFromDatabase();
    if (state.message === networkError) {
      // alert("something gone wrong", state.message);
      toast(`Something gone wrong, ${state.message}`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }
    if (!state.state) {
      toast(`Something gone wrong ${state.message}`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }
    dispatch(removeAllFromBag());
    toast.warning("All products has been removed from your bag");
    handleCloseDialog();
  };

  const handleRemoveFromBag = async (id) => {
    if (id === "removeAll") {
      ClearAllProducts();
      return;
    }
    const state = await removeItemfromBagInDatabaseById(id);
    if (state.message === networkError) {
      // alert("something gone wrong", state.message);
      toast(`Something gone wrong, ${state.message}`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }
    if (!state.state) {
      toast(`Something gone wrong`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }
    dispatch(removeFromBagById(id));
    toast.warning("Product has been removed from your bag");
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDisableCheckBox = () => {
    setDisabledCheckBox((prevData) => !prevData);
  };
  const handleChangeChecked = async (operand, product) => {
    switch (operand) {
      case "allBags": {
        handleDisableCheckBox();
        let newProduct = null;
        if (product.every((item) => item.checked)) {
          // console.log("all true good");
          newProduct = product.map((item) => {
            return { ...item, checked: false };
          });
          // console.log(newProduct);
          // dispatch(fetchBags());
        } else {
          // console.log("all false good");
          newProduct = product.map((item) => {
            return { ...item, checked: true };
          });
          // dispatch(fetchBags());
        }
        // console.log(newProduct.map((item) => item.checked));
        const resp = await updatingCountInProduct(newProduct);
        if (resp.state) {
          setTimeout(() => {
            handleDisableCheckBox();
            dispatch(fetchBags());
          }, 1500);
        } else {
          handleDisableCheckBox();

          // alert("something gone wrong");
          toast(`Something gone wrong`, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
        }
        break;
        return;
      }
      case "checked": {
        const newProduct = { ...product, checked: !product.checked };
        const resopnse = await updatingCountInProduct(newProduct);
        if (resopnse.state) {
          dispatch(fetchBags());
        }
        break;
      }
      case "sum": {
        const newProduct = { ...product, count: product.count + 1 };
        const resopnse = await updatingCountInProduct(newProduct);
        if (resopnse.state) {
          dispatch(fetchBags());
        }
        break;
      }
      case "minus": {
        const newProduct = { ...product, count: product.count - 1 };
        const resopnse = await updatingCountInProduct(newProduct);
        if (resopnse.state) {
          dispatch(fetchBags());
        }
        break;
      }
    }
    // console.log("event: ", product.id);
  };

  //#endregion

  //#region Calculation for Order
  let bagCount = 0;
  let subtotal = 0;
  let discountValue = 0;
  let shippingValue = 4.99;

  if (Bag.status === "succeeded") {
    const checkedBag = Bag.Bag.filter((item) => item.checked);
    if (checkedBag) {
      checkedBag.map((item) => {
        bagCount += item.count;
        subtotal +=
          (
            item.originalPrice -
            (item.originalPrice * item.discount) / 100
          ).toFixed(2) * item.count;
        discountValue +=
          ((item.originalPrice * item.discount) / 100).toFixed(2) * item.count;
      });
    }
  }
  //#endregion

  const DialogSection = () => {
    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={2}
        >
          <DialogTitle>
            <AutoDeleteRounded color="error" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <span
                style={{
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {product !== removeAll && product?.productName.toUpperCase()}{" "}
              </span>
              {product === removeAll
                ? "Remove All products from your bag?"
                : "Remove item from your bag?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Disagree</Button>
            <Button
              onClick={() => {
                handleRemoveFromBag(
                  product === removeAll ? removeAll : product?.id
                );
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  };

  useEffect(() => {
    dispatch(fetchBags());
  }, []);

  return (
    <Box>
      {disabledCheckBox ? (
        <LoadingComponent />
      ) : Bag.status === "loading" ? (
        <LoadingComponent />
      ) : Bag.status === "failed" ? (
        <Typography>Failed</Typography>
      ) : (
        <Stack
          // overflowX={"hidden"}
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{
            mx: { xs: 2, md: 10 },
            mb: 5,
          }}
        >
          <Box flex={4}>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-around",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography noWrap variant="h5" fontFamily={"monospace"}>
                My bag {bagCount !== 0 && bagCount}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "rgb(34,171,109)",
                }}
              >
                <LocalShippingRounded
                  sx={{
                    mr: 1,
                    verticalAlign: "middle",
                  }}
                />
                Sign up and save $4.99 with free shipping
              </Typography>
            </Box>
            {Bag?.Bag?.length === 0 ? (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <SentimentDissatisfiedRounded
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                  color="primary"
                />
                <Typography variant="h6" fontFamily={"serif"}>
                  You have no items in your bag!
                </Typography>
                <NavLink>
                  <Button variant="contained">LOG IN / SIGN UP</Button>
                </NavLink>
                <NavLink to="/">
                  <Button variant="outlined">CONTINUE SHOPPING</Button>
                </NavLink>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    width: "100%",
                    mt: 1,
                    py: 1,
                    backgroundColor: "rgb(240,240,240)",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 1,
                  }}
                >
                  <Checkbox
                    disabled={disabledCheckBox}
                    checked={Bag.Bag.every((item) => item.checked)}
                    onClick={() => {
                      handleChangeChecked("allBags", Bag.Bag);
                    }}
                    color="warning"
                  />
                  <Typography variant="body2" fontStyle={"italic"}>
                    <span style={{ color: "grey", fontSize: "16px" }}>
                      Seller:
                    </span>{" "}
                    <span
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      Trendyol
                    </span>
                  </Typography>
                  <Button
                    onClick={() => {
                      handleOpenDialog(removeAll);
                    }}
                    size="small"
                    sx={{
                      marginLeft: "auto",
                    }}
                    variant="text"
                  >
                    Remove All
                  </Button>
                </Box>

                {Bag.Bag.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Checkbox
                          checked={item.checked}
                          onClick={() => {
                            handleChangeChecked("checked", item);
                          }}
                          color="warning"
                        />
                        {/* product Section */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BagProduct product={item} hover={false} />
                        </Box>
                        {/* count section */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                border: "1px solid lightgray",
                              }}
                              color="error"
                              disabled={item.count <= 1}
                              onClick={() => {
                                handleChangeChecked("minus", item);
                              }}
                            >
                              <Typography variant="h6">-</Typography>
                            </Button>
                            <Box
                              sx={{
                                px: 1,
                              }}
                            >
                              {item.count}
                            </Box>
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                border: "1px solid lightgray",
                              }}
                              color="success"
                              onClick={() => {
                                handleChangeChecked("sum", item);
                              }}
                            >
                              <Typography variant="h6">+</Typography>
                            </Button>
                          </Box>
                          <Box>
                            <Typography noWrap>
                              {priceAfterDiscount(
                                item.originalPrice,
                                item.discount
                              )}
                              {" $"}
                            </Typography>
                          </Box>
                        </Box>
                        {/* Delete Section */}
                        <Box>
                          <Tooltip title="Delete Products">
                            <IconButton
                              onClick={() => {
                                handleOpenDialog(item);
                              }}
                            >
                              <Delete
                                sx={{
                                  verticalAlign: "middle",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        {/* Dialog  */}
                        <DialogSection />
                      </Box>
                      <Divider
                        sx={{
                          mt: 2,
                        }}
                      />
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
          <Box
            flex={1.5}
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "flex-start",
              position: { md: "sticky" },
              top: 0,
              height: "90vh",
              overflowY: "auto",
            }}
          >
            {Bag?.Bag?.length !== 0 && (
              <>
                <Typography variant="h6" mt={3} fontFamily={"monospace"}>
                  ORDER SUMMARY
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="caption"
                    color={"gray"}
                    fontSize={"15px"}
                  >
                    Subtotal
                  </Typography>
                  <Typography variant="body1">
                    {Number.parseFloat(subtotal).toFixed(2)} $
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="caption"
                    color={"gray"}
                    fontSize={"15px"}
                  >
                    Shipping
                  </Typography>
                  <Typography variant="body1">
                    {subtotal === 0 ? 0 : 4.99} $
                  </Typography>
                </Box>
                <Divider
                  variant="fullWidth"
                  sx={{
                    mb: 1,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" fontSize={"17px"}>
                    Total
                  </Typography>
                  <Typography variant="body1">
                    {subtotal === 0
                      ? 0
                      : Number.parseFloat(subtotal + shippingValue).toFixed(
                          2
                        )}{" "}
                    $
                  </Typography>
                </Box>
                <Typography color={"lightgray"} variant="body2">
                  (VAT included)
                </Typography>

                {/* Total Discount */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgb(229,250,236)",
                    p: 1.4,
                    borderRadius: 2,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Box display={"flex"}>
                    <Discount
                      sx={{
                        mr: 1,
                      }}
                    />
                    <Typography>Total savings</Typography>
                  </Box>
                  <Typography>
                    {Number.parseFloat(discountValue).toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  color="success"
                >
                  CHECKOUT
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">
                    <Error
                      color="error"
                      sx={{
                        width: "20px",
                        verticalAlign: "middle",
                      }}
                    />
                    You must be logged in to use the code
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: 1,
                      gap: 1,
                    }}
                  >
                    <TextField
                      size="medium"
                      placeholder="Enter coupon code"
                      variant="outlined"
                    />
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "rgb(153,153,153)",
                      }}
                      disableElevation
                    >
                      LOG IN AND APLLY
                    </Button>
                  </Box>
                </Box>
              </>
            )}
            <Box mt={{ xs: 0, md: Bag?.Bag?.length === 0 ? 5 : 0 }}>
              <PaymentMethod />
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Bag;
