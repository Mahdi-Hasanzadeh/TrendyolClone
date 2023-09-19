import { useLocation, useParams } from "react-router";

import {
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Stack,
  List,
  Divider,
  Chip,
  Drawer,
  SwipeableDrawer,
  Fab,
  useScrollTrigger,
  Fade,
  Skeleton,
  CircularProgress,
  Modal,
} from "@mui/material";

import { SidebarContent, LoadingComponent } from "./components.js";

import { NavLink, useSearchParams } from "react-router-dom";
// import Categories from "./CategoriesSection";

import { BreadCrumbsLinks } from "./components";
import { useEffect, useState } from "react";
import { KeyboardArrowUp, Menu, MenuOpen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenProducts } from "../AllSlices/MenCategorySlice.js";
import { priceAfterDiscount } from "../Utility/PriceDiscount.jsx";
import { updateScrollValue } from "../AllSlices/ScrollSlice.js";
const MenCategory = () => {
  const menProducts = useSelector((store) => store.MenProducts);
  const scroll = useSelector((store) => store.scrollToHomepage.scrollY);
  const dispatch = useDispatch();
  const location = useLocation();
  const [scrollValue, setScrollValue] = useState();
  window.scrollTo(0, scroll);
  // console.log(menProducts);

  //#region UseParams and UseSearchParams
  // const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  //#endregion

  //#region State for Drawer and Chips

  const [openDrawer, setOpenDrawer] = useState(false);

  const [ChipFilters, setChipFilters] = useState({
    gender: "Men",
    color: "All Colors",
    size: "All Sizes",
  });

  //#endregion

  //#region Handle Drawer

  const handleOpenDrawer = () => {
    setOpenDrawer((prevData) => !prevData);
  };

  //#endregion

  //#region  State for Values of Radio Buttons

  const [genderValue, setGenderValue] = useState("Men");
  const [categoryValue, setCategoryValue] = useState(null);
  const [sizeValue, setSizeValue] = useState("All Sizes");
  const [priceValue, setPriceValue] = useState(null);
  const [colorValue, setColorValue] = useState("All Colors");

  //#endregion

  //#region Handle Value for Filters

  const handleGenderValue = (event) => {
    setGenderValue(event.target.value);
    // ChipFilters[0].value = event.target.value;
    setChipFilters((prevData) => {
      return {
        ...prevData,
        gender: event.target.value,
      };
    });
    window.scrollTo(0, 280);
  };
  const handleCategoryValue = (event) => {
    setCategoryValue(event.target.value);
    window.scrollTo(0, 280);

    // ChipFilters[0].value = event.target.value;
  };
  const handleSizeValue = (event) => {
    if (event.target.value) {
      setSizeValue(event.target.value);
      setChipFilters((prevData) => {
        return {
          ...prevData,
          size: event.target.value,
        };
      });
      window.scrollTo(0, 280);

      setSearchParams({ size: event.target.value });
    } else {
      setSearchParams();
    }
  };

  const handleColorValue = (event) => {
    if (event.target.value) {
      setColorValue(event.target.value);
      setChipFilters((prevData) => {
        return {
          ...prevData,
          color: event.target.value,
        };
      });
      setSearchParams({ color: event.target.value });
      window.scrollTo(0, 280);
    } else {
      setSearchParams();
    }
  };

  const handlePriceValue = (event) => {
    setPriceValue(event.target.value);
    window.scrollTo(0, 280);
  };

  const handleDelete = (value) => {
    switch (value) {
      case "gender": {
        setGenderValue(null);
        setChipFilters((prevData) => {
          return {
            ...prevData,
            gender: "",
          };
        });
        break;
      }
      case "color": {
        setColorValue("All Colors");
        setChipFilters((prevData) => {
          return {
            ...prevData,
            color: "All Colors",
          };
        });
        break;
      }
      case "size": {
        setSizeValue("All Sizes");
        setChipFilters((prevData) => {
          return {
            ...prevData,
            size: "All Sizes",
          };
        });
      }
    }
  };
  //#endregion

  // filters for TextField
  const filters = [
    "Suggested order",
    "Lowest price",
    "Highest price",
    "New arrivals",
    "Best Sellers",
    "Most favorited",
    "Most rated",
  ];

  const params = searchParams.get("filter");

  let filteredMenProduct = [...menProducts.menProducts];
  // if (sizeValue !== "All Sizes") {
  //   filteredMenProduct = filteredMenProduct.filter(
  //     (item) => item.size.toLowerCase() === sizeValue.toLowerCase()
  //   );
  // }
  // if (colorValue !== "All Colors") {
  //   filteredMenProduct = filteredMenProduct.filter(
  //     (item) => item.color.toLowerCase() === colorValue.toLowerCase()
  //   );
  // }

  // Check that if search Params is available or not
  if (params) {
    filteredMenProduct = filteredMenProduct.filter(
      (item) =>
        item.productName.toLowerCase().includes(params.toLowerCase()) ||
        item.description.toLowerCase().includes(params.toLowerCase())
    );
  }

  useEffect(() => {
    setOpenDrawer(false);
    dispatch(fetchMenProducts({ sizeValue, colorValue, categoryValue }));
  }, [sizeValue, colorValue, categoryValue]);

  useEffect(() => {
    window.scrollTo(0, scroll);
  }, [scroll]);

  // Page Section
  return (
    <>
      {/* Breadcrumb section */}
      <Box>
        <Breadcrumbs
          separator=">"
          sx={{
            mt: 1,
            ml: 2,
          }}
        >
          <BreadCrumbsLinks
            underline="none"
            to="/"
            LinkName="Homepage"
            isActtive={false}
          />
          <BreadCrumbsLinks
            underline="always"
            LinkName="Men Products"
            isActive={true}
          />
        </Breadcrumbs>
      </Box>
      {/* Information Section */}
      <Box
        sx={{
          height: "100px",
          backgroundColor: "rgb(240,240,240)",
          display: "flex",
          gap: 1.2,
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-around" },
          alignItems: { xs: "center", sm: "center" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "baseline",
          }}
        >
          <Typography variant="h6" fontSize={"26px"}>
            Men
          </Typography>
          <Typography variant="body2" color="gray" fontSize="17px">
            {filteredMenProduct.length} items
          </Typography>
        </Box>
        {/* Select Filters for the products */}
        <Box
        // sx={{
        //   width: "250px",
        // }}
        >
          <TextField
            select
            size="small"
            label="Select"
            defaultValue={filters[0]}
          >
            {filters.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </Box>

      <Stack m={1} direction="row">
        {/* Filters Section */}
        <SwipeableDrawer
          sx={{
            display: { xs: "flex", md: "none" },
          }}
          onOpen={handleOpenDrawer}
          anchor="top"
          open={openDrawer}
          onClose={handleOpenDrawer}
        >
          <Fab
            onClick={handleOpenDrawer}
            size="small"
            sx={{
              position: "fixed",
              top: 5,
              right: 5,
              display: { xs: "block", md: "none" },
            }}
          >
            {openDrawer ? <MenuOpen /> : <Menu />}
          </Fab>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography variant="h6" fontStyle={"italic"}>
              Trendyol
            </Typography>
          </Box>
          <SidebarContent
            gender={{ genderValue, handleGenderValue }}
            size={{
              sizeValue,
              handleSizeValue,
            }}
            color={{
              colorValue,
              handleColorValue,
            }}
            category={{
              categoryValue,
              handleCategoryValue,
            }}
            price={{
              priceValue,
              handlePriceValue,
            }}
          />
        </SwipeableDrawer>
        <Fab
          onClick={handleOpenDrawer}
          size="small"
          sx={{
            position: "fixed",
            bottom: 10,
            left: 3,
            display: { xs: "block", md: "none" },
          }}
        >
          {openDrawer ? <MenuOpen /> : <Menu />}
        </Fab>
        {
          <Box
            flex={{ xs: 0, sm: 1 }}
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              position: "sticky", // Make the sidebar fixed
              top: 0, // Adjust the top position as needed
              height: "100vh", // Set the height to match the viewport height
              overflowY: "auto", // Allow vertical scrolling if content overflows
              overflowX: "hidden",
            }}
            display="flex"
            justifyContent={"center"}
          >
            <SidebarContent
              gender={{ genderValue, handleGenderValue }}
              size={{
                sizeValue,
                handleSizeValue,
              }}
              color={{
                colorValue,
                handleColorValue,
              }}
              category={{
                categoryValue,
                handleCategoryValue,
              }}
              price={{
                priceValue,
                handlePriceValue,
              }}
            />
            {/* <List
            sx={{
              mt: 3,
              // overflowY: "auto",
            }}
          >
            <MyListItem
              handleOpen={() => {
                handleOpen("gender");
              }}
              primary={"Gender"}
              isOpen={openGenderSection}
              badgeValue={genderValue ? true : false}
            >
              <RadioButtonsListWithCollapse
                open={openGenderSection}
                radioButtonValue={genderValue}
                radioButtonOnChange={handleGenderValue}
                radioButtonsInfo={["Men", "Women"]}
              />
            </MyListItem>
            <Divider
              sx={{
                my: 1,
              }}
            />

            <MyListItem
              isOpen={openCategorySection}
              primary={"Category"}
              handleOpen={() => {
                handleOpen("category");
              }}
              badgeValue={categoryValue ? 1 : 0}
            >
              <RadioButtonsListWithCollapse
                open={openCategorySection}
                radioButtonOnChange={handleCategoryValue}
                radioButtonValue={categoryValue}
                radioButtonsInfo={["Jeans", "Sweater", "Pants"]}
              />
            </MyListItem>
            <Divider
              sx={{
                my: 1,
              }}
            />

            <MyListItem
              isOpen={openSizeSection}
              primary={"Size"}
              handleOpen={() => {
                handleOpen("size");
              }}
              badgeValue={sizeValue !== "All Sizes" ? 1 : 0}
            >
              <RadioButtonsListWithCollapse
                open={openSizeSection}
                radioButtonOnChange={handleSizeValue}
                radioButtonValue={sizeValue}
                radioButtonsInfo={["All Sizes", "XS", "S", "M", "L"]}
              />
            </MyListItem>
            <Divider
              sx={{
                my: 1,
              }}
            />

            <MyListItem
              isOpen={openColorSection}
              primary={"Color"}
              handleOpen={() => {
                handleOpen("color");
              }}
              badgeValue={colorValue !== "All Colors" ? 1 : 0}
            >
              <RadioButtonsListWithCollapse
                open={openColorSection}
                radioButtonOnChange={handleColorValue}
                radioButtonValue={colorValue}
                radioButtonsInfo={[
                  "All Colors",
                  "Black",
                  "Blue",
                  "Gray",
                  "White",
                ]}
              />
            </MyListItem>
            <Divider
              sx={{
                my: 1,
              }}
            />
          </List> */}
          </Box>
        }

        {/* Products Section */}
        <Box
          flex={6}
          sx={{
            overflowY: "hidden",
            mt: 3,
          }}
        >
          {menProducts.status === "succeeded" && (
            <Box
              m={1}
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {ChipFilters.gender ? (
                <Chip
                  label={`Gender: ${ChipFilters.gender}`}
                  onDelete={() => {
                    handleDelete("gender");
                  }}
                />
              ) : null}
              {ChipFilters.color !== "All Colors" ? (
                <Chip
                  label={`Color: ${ChipFilters.color}`}
                  onDelete={() => {
                    handleDelete("color");
                  }}
                />
              ) : null}
              {ChipFilters.size !== "All Sizes" ? (
                <Chip
                  label={`Size: ${ChipFilters.size}`}
                  onDelete={() => {
                    handleDelete("size");
                  }}
                />
              ) : null}
            </Box>
          )}
          {/* Products Section */}
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {menProducts.status === "loading" ? (
              <LoadingComponent />
            ) : menProducts.status === "failed" ? (
              <Typography mt={10} variant="h4">
                {menProducts.error}
              </Typography>
            ) : menProducts.status === "succeeded" &&
              filteredMenProduct.length !== 0 ? (
              filteredMenProduct.map((item) => {
                return (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      sx={{
                        maxWidth: 250,
                      }}
                    >
                      <NavLink
                        onClick={() => {
                          dispatch(updateScrollValue(window.scrollY));
                        }}
                        to={`products/${item.id}${location.search}`}
                      >
                        <CardMedia
                          component={"img"}
                          image={`/TrendyolClone/${item.picture}`}
                          width="100%"
                        />
                      </NavLink>
                      <CardContent
                        sx={{
                          padding: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          {/* Product Name */}

                          <Typography
                            variant="body1"
                            textOverflow={"ellipsis"}
                            fontWeight={"600"}
                            fontStyle={"italic"}
                            fontSize={"12px"}
                            noWrap
                          >
                            {item.productName.toUpperCase()}
                          </Typography>
                          {/* <Skeleton variant="circular" width="400px" /> */}

                          {/* Product Description */}

                          <Typography
                            textOverflow={"ellipsis"}
                            color={"gray"}
                            variant="body2"
                            noWrap
                          >
                            {item.description}
                          </Typography>

                          {/* Rating */}
                          <Typography> Rating: {item.rating} / 5</Typography>
                          {/* Price after discount */}
                          <Typography variant="h6" color="red">
                            {priceAfterDiscount(
                              item.originalPrice,
                              item.discount
                            )}
                            {" $"}
                          </Typography>
                          {/* Prce before discount */}
                          <Typography color={"gray"}>
                            {"Before:"}
                            <strike> {item.originalPrice} </strike>{" "}
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              &nbsp;&nbsp;-{item.discount}%
                            </span>
                          </Typography>
                          {/* color and size */}
                          {/* <Typography>
                        {item.color} {item.size}
                      </Typography> */}
                          {/* Free shipping */}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Box
                sx={{
                  mt: 5,
                }}
              >
                <Typography variant="h5" mt={10}>
                  Not Found
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>

        {/* <Fab
          sx={{
            position: "fixed",
            bottom: 4,
            right: 4,
          }}
          size="small"
        >
          <a href="#top">
            <KeyboardArrowUp />
          </a>
        </Fab> */}
      </Stack>
    </>
  );
};

export default MenCategory;
