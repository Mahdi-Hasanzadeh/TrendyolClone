import { ListItemButton, ListItemText, ListItem, Badge } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
const MyListItem = ({ primary, handleOpen, children, isOpen, badgeValue }) => {
  return (
    <ListItem
      disablePadding
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        pt: "5px",
        pb: "5px",
      }}
    >
      <ListItemButton
        sx={{
          width: "150px",
        }}
        onClick={handleOpen}
      >
        <ListItemText
          primary={
            <Badge
              color="warning"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={badgeValue ? 1 : 0}
            >
              <span
                style={{
                  marginRight: "10px",
                }}
              >
                {primary}
              </span>
            </Badge>
          }
          sx={{
            my: 0,
          }}
        />
        {isOpen ? (
          <ExpandLess
            sx={{
              color: "orange",
            }}
          />
        ) : (
          <ExpandMore />
        )}
      </ListItemButton>
      {children}
    </ListItem>
  );
};

export default MyListItem;
