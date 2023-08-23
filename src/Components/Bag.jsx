import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, PaymentMethod } from "./components";
import { useEffect, useState } from "react";
import { fetchBags } from "../BagSlice";
import {
  Delete,
  Discount,
  Error,
  FavoriteBorder,
  Height,
  LocalShippingRounded,
} from "@mui/icons-material";

const imageFolderPath = "../../public/";

const Bag = () => {
  const Bag = useSelector((store) => store.Bag);
  const dispatch = useDispatch();
  const [checkedBag, setCheckedBag] = useState(true);

  const handleCheckedBag = () => {
    setCheckedBag((prevData) => !prevData);
  };

  let bagCount = 0;
  if (Bag.status === "succeeded") {
    Bag.Bag.map((item) => {
      bagCount += item.count;
    });
  }

  useEffect(() => {
    dispatch(fetchBags());
  }, []);
  return (
    <Box>
      {Bag.status === "loading" ? (
        <LoadingComponent />
      ) : Bag.status === "failed" ? (
        <Typography>Failed</Typography>
      ) : (
        <Stack
          overflowX={"hidden"}
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
                My bag ({bagCount})
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
                checked={checkedBag}
                onClick={handleCheckedBag}
                color="warning"
              />
              <Typography variant="body2" fontStyle={"italic"}>
                <span style={{ color: "grey", fontSize: "16px" }}>Seller:</span>{" "}
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  Trendyol
                </span>
              </Typography>
            </Box>

            {Bag.Bag.map((item, index) => {
              return (
                <>
                  <Box
                    key={index}
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
                    <Checkbox color="warning" />
                    {/* product Section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: "70px",
                          Height: "70px",
                        }}
                      >
                        <img
                          style={{
                            borderRadius: "7px",
                          }}
                          width={"100%"}
                          src={`${imageFolderPath}${item.picture}`}
                          alt=""
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            width: "220px",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                          variant="body2"
                        >
                          {item.productName} {item.description}
                        </Typography>

                        <Typography
                          color={"lightgray"}
                          variant="caption"
                          fontSize={"16px"}
                        >
                          Size: {item.size.toUpperCase()}
                        </Typography>
                        <Typography
                          color={"lightgray"}
                          variant="caption"
                          fontSize={"16px"}
                        >
                          Deliver by 31 september
                        </Typography>
                      </Box>
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
                        >
                          -
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
                        >
                          +
                        </Button>
                      </Box>
                      <Box>
                        <Typography noWrap>{item.originalPrice} $</Typography>
                      </Box>
                    </Box>
                    {/* Delete Section */}
                    <Box>
                      <Tooltip title="Delete Products">
                        <Delete
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      mt: 2,
                    }}
                  />
                </>
              );
            })}
          </Box>
          <Box
            flex={1.5}
            sx={{
              display: "flex",
              flexDirection: "column",

              // justifyContent: "flex-start",
            }}
          >
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
              <Typography variant="caption" color={"gray"} fontSize={"15px"}>
                Subtotal
              </Typography>
              <Typography variant="body1">41 $</Typography>
            </Box>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="caption" color={"gray"} fontSize={"15px"}>
                Shipping
              </Typography>
              <Typography variant="body1">4.99 $</Typography>
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
              <Typography variant="body1">58 $</Typography>
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
              <Typography>5 $</Typography>
            </Box>
            <Button fullWidth variant="contained" size="large" color="success">
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
            <PaymentMethod />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Bag;
