import { useLocation, useParams } from "react-router";
import { MenCategories, GetMenProductsByFilter } from "./Products";
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
} from "@mui/material";

import { RadioButtonsListWithCollapse, MyListItem } from "./components.js";

import { NavLink, useSearchParams } from "react-router-dom";
// import Categories from "./CategoriesSection";

import { BreadCrumbsLinks } from "./components";
import { useState } from "react";

const MenCategory = () => {
  //#region UseParams and UseSearchParams
  // const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  //#endregion

  //#region State for Collapsable Sections
  const [openGenderSection, setOpenGenderSection] = useState(false);
  const [openCategorySection, setOpenCategorySection] = useState(false);
  const [openSizeSection, setOpenSizeSection] = useState(false);
  const [openPriceSection, setOpenPriceSection] = useState(false);
  const [openColorSection, setOpenColorSection] = useState(false);
  const [ChipFilters, setChipFilters] = useState({
    gender: "Men",
    color: "All Colors",
    size: "All Sizes",
  });
  //#endregion

  //#region Handle Function for Open Collapsable Sections

  const handleOpen = (event) => {
    switch (event) {
      case "gender": {
        setOpenGenderSection((prevData) => !prevData);
        break;
      }
      case "category": {
        setOpenCategorySection((prevData) => !prevData);
        break;
      }
      case "size": {
        setOpenSizeSection((prevData) => !prevData);
        break;
      }
      case "price": {
        setOpenPriceSection((prevData) => !prevData);
        break;
      }
      case "color": {
        setOpenColorSection((prevData) => !prevData);
      }
      default:
        return;
    }
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
  };
  const handleCategoryValue = (event) => {
    setCategoryValue(event.target.value);
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
    } else {
      setSearchParams();
    }
  };

  const handlePriceValue = (event) => {
    setPriceValue(event.target.value);
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

  let filteredMenProduct = [...MenCategories];
  if (sizeValue && colorValue) {
    filteredMenProduct = GetMenProductsByFilter(sizeValue, colorValue);
    // } else {
    //   if (sizeValue) {
    //     filteredMenProduct = GetMenProductsByFilter(sizeValue);
    //   }
    //   if (colorValue) {
    //     filteredMenProduct = GetMenProductsByFilter("", colorValue);
    //   }
  }

  // Check that if search Params is available or not
  if (params) {
    filteredMenProduct = filteredMenProduct.filter(
      (item) =>
        item.productName.toLowerCase().includes(params.toLowerCase()) ||
        item.description.toLowerCase().includes(params.toLowerCase())
    );
  }

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
          justifyContent: "space-around",
          alignItems: "center",
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
          sx={{
            width: "250px",
          }}
        >
          <TextField
            fullWidth
            select
            label="Select"
            defaultValue={filters[0]}
            helperText=""
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
        <Box
          flex={{ xs: 0, sm: 1 }}
          sx={{
            ml: 1,
            display: { xs: "none", md: "flex" },
          }}
          display="flex"
          justifyContent={"center"}
        >
          <List
            sx={{
              mt: 3,
              // overflowY: "auto",
            }}
          >
            {/* Gender Section */}
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
            {/* Category Section */}
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
            {/* Size Section */}
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
            {/* Color Section */}

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
          </List>
        </Box>

        {/* Products Section */}
        <Box
          flex={6}
          sx={{
            overflowY: "hidden",
            mt: 3,
          }}
        >
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
            {filteredMenProduct.length !== 0 ? (
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
                        to={`products/${item.id}${useLocation().search}`}
                      >
                        <CardMedia
                          component={"img"}
                          image={item.picture}
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
                            {(
                              item.originalPrice -
                              (item.originalPrice * item.discount) / 100
                            ).toFixed(2)}
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
                <Typography>Not Found</Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default MenCategory;
