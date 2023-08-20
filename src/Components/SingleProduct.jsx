import { useLocation, useParams } from "react-router";
import { GetProductById } from "./Products";
import { ProductCard } from "./components.js";
import { Box, Breadcrumbs, Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import { BreadCrumbsLinks } from "./components";
const SingleProduct = () => {
  const { productId } = useParams();
  const product = GetProductById(productId);
  console.log(useLocation().pathname);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          overflowX: "hidden",
        }}
      >
        {/* Breadcrumb Section */}
        <Box>
          <Breadcrumbs
            separator=">"
            sx={{
              mt: 1,
            }}
          >
            <BreadCrumbsLinks
              underline={"none"}
              to="/"
              LinkName={"Homepage"}
              isActive={false}
            />
            <BreadCrumbsLinks
              underline={"none"}
              to="/products/Men"
              LinkName={"Men Products"}
              isActive={false}
            />
            <BreadCrumbsLinks
              underline={"always"}
              to=""
              LinkName="Single Product"
              isActive={true}
            />
          </Breadcrumbs>
        </Box>
        {/* Single Product Section */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          {product ? (
            <>
              <NavLink to={`/products/Men/${useLocation().search}`}>
                <Button variant="contained">Back</Button>
              </NavLink>
              <ProductCard product={product} />
              <Button variant="contained">Add to Cart</Button>
            </>
          ) : (
            "not found cart"
          )}
        </Box>
      </Container>
    </>
  );
};

export default SingleProduct;
