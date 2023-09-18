import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  Tooltip,
  styled,
} from "@mui/material";

import { Delete } from "@mui/icons-material";
import { useState } from "react";

const Categories = () => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };

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
          overflowX: "auto",
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "#888 #f1f1f1", // For Firefox
          "&::-webkit-scrollbar": {
            height: "10px",
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
        maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            flexWrap: "nowrap",
            width: "800px",
          }}
        >
          {categories.map((item, index) => {
            return (
              <MyBox
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
              >
                <StyledLink href="#">{item}</StyledLink>
              </MyBox>
            );
          })}
          <Box
            sx={{
              display: open ? "block" : "none",
            }}
          >
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
        </Box>
      </Container>
    </>
  );
};

export default Categories;
