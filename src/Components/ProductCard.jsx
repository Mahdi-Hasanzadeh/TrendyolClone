import { Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
const path = "../../public/";

const Product = ({ product }) => {
  // console.log(useLocation());
  // console.log(product);
  return (
    <Link to={`/products/${product.category}`}>
      <Card
        sx={{
          maxWidth: 600,
        }}
      >
        <CardMedia component={"img"} image={`./${product.picture}`} />
      </Card>
    </Link>
  );
};

export default Product;
