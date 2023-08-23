import { Divider, List } from "@mui/material";
import { MyListItem, RadioButtonsListWithCollapse } from "./components";
import { useState } from "react";
const SidebarContent = ({ gender, price, category, size, color }) => {
  const [openGenderSection, setOpenGenderSection] = useState(false);
  const [openCategorySection, setOpenCategorySection] = useState(false);
  const [openSizeSection, setOpenSizeSection] = useState(false);
  const [openPriceSection, setOpenPriceSection] = useState(false);
  const [openColorSection, setOpenColorSection] = useState(false);

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

  return (
    <List
      sx={{
        mt: { xs: 0, md: 3 },
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
        badgeValue={gender.genderValue ? true : false}
      >
        <RadioButtonsListWithCollapse
          open={openGenderSection}
          radioButtonValue={gender.genderValue}
          radioButtonOnChange={gender.handleGenderValue}
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
        badgeValue={category.categoryValue ? 1 : 0}
      >
        <RadioButtonsListWithCollapse
          open={openCategorySection}
          radioButtonOnChange={category.handleCategoryValue}
          radioButtonValue={category.categoryValue}
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
        badgeValue={size.sizeValue !== "All Sizes" ? 1 : 0}
      >
        <RadioButtonsListWithCollapse
          open={openSizeSection}
          radioButtonOnChange={size.handleSizeValue}
          radioButtonValue={size.sizeValue}
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
        badgeValue={color.colorValue !== "All Colors" ? 1 : 0}
      >
        <RadioButtonsListWithCollapse
          open={openColorSection}
          radioButtonOnChange={color.handleColorValue}
          radioButtonValue={color.colorValue}
          radioButtonsInfo={["All Colors", "Black", "Blue", "Gray", "White"]}
        />
      </MyListItem>
      <Divider
        sx={{
          my: 1,
        }}
      />
    </List>
  );
};

export default SidebarContent;
