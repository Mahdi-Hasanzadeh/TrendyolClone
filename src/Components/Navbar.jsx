import {
  FavoriteBorderRounded,
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

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const badges = [
    <LocalShippingRounded />,
    <Person2Rounded />,
    <FavoriteBorderRounded />,
    <ShoppingBagRounded />,
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setSearchParams({ filter: e.target.value });
    } else {
      setSearchParams();
    }
  };
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
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: "center",
            gap: 3,
            height: 75,
            mx: 5,
          }}
        >
          <Typography
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
                size="medium"
                label="Search"
                fullWidth
                sx={{
                  bgcolor: "whitesmoke",
                  maxWidth: "350px",
                  minWidth: "290px",
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
                <Badge key={index} badgeContent={0} color="warning">
                  <IconButton
                    sx={{
                      color: "white",
                    }}
                  >
                    {item}
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
