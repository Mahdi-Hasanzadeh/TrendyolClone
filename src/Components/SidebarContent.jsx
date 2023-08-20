const SidebarContent = () => {
  return (
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
            radioButtonsInfo={["All Colors", "Black", "Blue", "Gray", "White"]}
          />
        </MyListItem>
        <Divider
          sx={{
            my: 1,
          }}
        />
      </List>
    </Box>
  );
};

export default SidebarContent;
