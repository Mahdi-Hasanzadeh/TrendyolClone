import { Box, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Styles from "../Styles.module.css";
const BreadCrumbsLinks = ({ underline, to, LinkName, isActive }) => {
  return (
    <Link component={"p"} underline={"none"}>
      <NavLink to={to || ""} className={Styles.navLink}>
        <Box
          component="span"
          sx={{
            color: isActive ? "black" : "gray",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="overline">{LinkName}</Typography>
        </Box>
      </NavLink>
    </Link>
  );
};
export default BreadCrumbsLinks;
