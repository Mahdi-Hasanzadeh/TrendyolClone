import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";

const Categories = () => {
  const [open, setOpen] = useState(false);

  //   const handleOpen = (event, newValue) => {
  //     setOpen((prevData) => !prevData);
  //   };

  //   const handleClose = () => {
  //     setOpen((prevData) => false);
  //   };

  const StyledLink = styled("a")({
    fontSize: "16px",
    textDecoration: "none",
    color: "white",
    fontFamily: "monospace",
    "&:hover": {
      color: "gray",
    },
  });

  const MyBox = styled(Box)({
    padding: 10,
    "&:hover": {
      backgroundColor: "white",
      color: "gray",
    },
  });

  const categories = [
    "Sale",
    "New in",
    "Clothing",
    "Tops",
    "Pants & Jeans",
    "Shoes & Accessories",
    "Sportwear",
  ];

  return (
    <>
      <Container
        sx={{
          backgroundColor: "rgb(91, 91, 91)",
          overflowX: "scroll",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexWrap: "nowrap",
          }}
        >
          {categories.map((item, index) => {
            return (
              <MyBox key={index}>
                <StyledLink href="#">{item}</StyledLink>
              </MyBox>
            );
          })}
          {/* <Menu
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box
            sx={{
              width: "200px",
              height: "200px",
            }}
          >
            <Typography>Text</Typography>
          </Box>
        </Menu> */}
        </Box>
      </Container>
    </>
  );
};

export default Categories;
