import { Box, Typography } from "@mui/material";
import styles from "../Styles.module.css";
const Tooltip = ({
  show,
  content,
  position,
  children,
  mouseEnter,
  mouseLeave,
}) => {
  return (
    <Box
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={`${styles.tooltip} ${show ? styles.tooltipShow : ""} ${
        position === "top"
          ? styles.top
          : position === "left"
          ? styles.left
          : styles.bottom
      }`}
    >
      {content}
      {/* {children} */}
    </Box>
  );
};

export default Tooltip;
