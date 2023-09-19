import { Box, Typography } from "@mui/material";
import { priceAfterDiscount } from "../Utility/PriceDiscount.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const BagProduct = ({ product, hover }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToSingleProduct = (productId) => {
    if (location.pathname !== `/products/Men/products/${productId}`) {
      // alert(productId);
      navigate(`products/Men/products/${productId}${location.search}`);
      // window.location.reload();
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "70px",
          Height: "70px",
          cursor: hover ? "pointer" : "context-menu",
        }}
        onClick={() => {
          if (hover) {
            navigateToSingleProduct(product.id);
          }
        }}
      >
        <img
          style={{
            borderRadius: "7px",
          }}
          width={"100%"}
          src={`docs/${product.picture}`}
          alt={product.productName}
        />
      </Box>
      <Box
        onClick={() => {
          if (hover) {
            navigateToSingleProduct(product.id);
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: hover ? 0 : 1,
          cursor: hover ? "pointer" : "context-menu",
        }}
      >
        <Typography
          sx={{
            width: hover ? "150px" : "220px",
            textOverflow: !hover && "ellipsis",
            overflow: !hover && "hidden",
          }}
          variant="body2"
        >
          {product.productName} {product.description}
        </Typography>

        <Typography
          color={hover ? "black" : "lightgray"}
          variant="caption"
          fontSize={hover ? "14px" : "16px"}
        >
          Size: {product.size.toUpperCase()} Quantity:{" "}
          {hover ? product.count : null}
        </Typography>
        {hover && (
          <Box>
            <Typography noWrap>
              {priceAfterDiscount(product.originalPrice, product.discount)}
              {" $"}
            </Typography>
          </Box>
        )}
        {!hover && (
          <Typography color={"lightgray"} variant="caption" fontSize={"16px"}>
            Deliver by 31 september
          </Typography>
        )}
      </Box>
    </>
  );
};
export default BagProduct;
