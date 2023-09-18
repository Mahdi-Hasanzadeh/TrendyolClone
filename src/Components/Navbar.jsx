import {
  FavoriteBorderRounded,
  HomeRounded,
  LocalShippingRounded,
  Person2Rounded,
  ShoppingBagRounded,
} from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  TextField,
  Badge,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { useLocation } from "react-router";
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom";

import Styles from "../Styles.module.css";
import { useEffect, useState } from "react";

import { fetchBags } from "../AllSlices/BagSlice";
import { useDispatch, useSelector } from "react-redux";
import { BagProduct } from "./components.js";
import MyTooltip from "./Tooltip";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Bag = useSelector((store) => store.Bag);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openTooltip, setOpenTooltip] = useState(false);

  // console.log("Bag", Bag.Bag);
  let badgeCount = 0;

  if (Bag.status === "succeeded") {
    // console.log("badge succeeded");
    Bag.Bag.map((item) => {
      badgeCount = badgeCount + item.count;
    });
  }
  // console.log("badgeCount: ", badgeCount);

  const badges = [
    {
      name: "bagShopping",
      icon: (
        <ShoppingBagRounded
          sx={{
            color: "white",
          }}
        />
      ),
    },
    {
      name: "localShipping",
      icon: (
        <LocalShippingRounded
          sx={{
            color: "white",
          }}
        />
      ),
    },
    {
      name: "person",
      icon: (
        <Person2Rounded
          sx={{
            color: "white",
          }}
        />
      ),
    },
    {
      name: "favorite",
      icon: (
        <FavoriteBorderRounded
          sx={{
            color: "white",
          }}
        />
      ),
    },
  ];

  const BagContent = () => {
    if (Bag.status === "succeeded") {
      if (Bag.Bag.length === 0) {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 2,
              width: "300px",
            }}
          >
            <Box>
              <Typography variant="body2" color="GrayText">
                Your Bag is Empty
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="GrayText"
                sx={{
                  textAlign: "center",
                }}
              >
                See the latest fashion trends and add your favorites to your bag
              </Typography>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "black",
                }}
                onClick={() => {
                  navigateTo("/");
                }}
              >
                Discvoer What's New
              </Button>
            </Box>
          </Box>
        );
      }
      return (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              ml: 1,
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6">Bag ({badgeCount})</Typography>
            </Box>
            <Box
              sx={{
                height: "250px",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#888 #f1f1f1", // For Firefox
                "&::-webkit-scrollbar": {
                  width: "5.5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {Bag.Bag.map((item, index) => {
                return (
                  <Box key={index} display={"flex"} gap={3}>
                    <BagProduct product={item} hover={true} />
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={() => {
                  navigateTo("/cart");
                }}
                variant="contained"
              >
                View Bag
              </Button>
              <Button variant="contained">Checkout</Button>
            </Box>
          </Box>
        </>
      );
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setSearchParams({ filter: e.target.value });
    } else {
      setSearchParams();
    }
  };

  const handleMouseEnter = () => {
    setOpenTooltip(true);
  };

  const handleMouseLeave = () => {
    setOpenTooltip(false);
  };
  const navigateTo = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
    setOpenTooltip(false);
  };

  useEffect(() => {
    dispatch(fetchBags());
  }, [dispatch]);

  return (
    <>
      <Container
        sx={{
          backgroundColor: "rgb(51,51,51)",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "space-around", md: "space-around" },
            alignItems: "center",
            gap: 3,
            height: 75,
            mx: 5,
          }}
        >
          <Typography
            display={{ xs: "none", sm: "flex" }}
            variant="h4"
            fontStyle={"italic"}
            sx={{
              mr: "auto",
            }}
          >
            <NavLink
              to="/"
              className={`${Styles.navLink} ${Styles.navLinkBrand}`}
            >
              trendyol
            </NavLink>
          </Typography>

          <Box display={{ xs: "flex", sm: "none" }}>
            <NavLink
              to="/"
              className={`${Styles.navLink} ${Styles.navLinkBrand}`}
            >
              <HomeRounded
                sx={{
                  color: "white",
                }}
              />
            </NavLink>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            flex={2}
            justifyContent={"center"}
            gap={5}
          >
            <Typography color="white">Women</Typography>
            <Typography color="white">Men</Typography>
          </Box>
          <Box
            sx={{
              flex: { md: 3 },
            }}
          >
            {location.pathname.slice(0, location.pathname.length - 1) !==
              "/products/Men/products/" && (
              <TextField
                onChange={handleChange}
                value={searchParams.get("filter") || ""}
                variant="filled"
                placeholder="Type the item,category or brand you are looking"
                size="small"
                label="Search"
                fullWidth
                sx={{
                  bgcolor: "whitesmoke",
                  maxWidth: "350px",
                  minWidth: "240px",
                  borderRadius: 1,
                  borderColor: "red",
                  "&:focus": {
                    textDecoration: "none",
                  },
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            flex={2}
            justifyContent={"flex-end"}
          >
            {badges.map((item, index) => {
              return (
                <Badge
                  key={index}
                  badgeContent={item.name === "bagShopping" ? badgeCount : 0}
                  color="warning"
                  sx={{
                    position: "relative",
                  }}
                >
                  <IconButton
                    onMouseEnter={
                      item.name === "bagShopping" ? handleMouseEnter : null
                    }
                    onMouseLeave={
                      item.name === "bagShopping" ? handleMouseLeave : null
                    }
                    onClick={() => {
                      item.name === "bagShopping" ? navigateTo("/cart") : null;
                      setOpenTooltip(false);
                    }}
                  >
                    {item.icon}
                  </IconButton>
                  {item.name === "bagShopping" && (
                    <MyTooltip
                      mouseEnter={handleMouseEnter}
                      mouseLeave={handleMouseLeave}
                      show={openTooltip}
                      content={<BagContent />}
                      position={"bottom"}
                    />
                  )}
                </Badge>
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Navbar;
