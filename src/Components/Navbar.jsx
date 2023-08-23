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
} from "@mui/material";
import { useLocation } from "react-router";
import { NavLink, useSearchParams } from "react-router-dom";

import Styles from "../Styles.module.css";
import { useEffect } from "react";

import { fetchBags } from "../BagSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const Bag = useSelector((store) => store.Bag);

  // console.log("Bag", Bag.Bag);

  let badgeCount = 0;

  if (Bag.status === "succeeded") {
    console.log("badge succeeded");
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

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setSearchParams({ filter: e.target.value });
    } else {
      setSearchParams();
    }
  };

  useEffect(() => {
    dispatch(fetchBags());
  }, []);

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
            {useLocation().pathname.slice(
              0,
              useLocation().pathname.length - 1
            ) !== "/products/Men/products/" && (
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
                >
                  <IconButton>
                    {item.name === "bagShopping" ? (
                      <NavLink to="/cart">{item.icon}</NavLink>
                    ) : (
                      item.icon
                    )}
                  </IconButton>
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
