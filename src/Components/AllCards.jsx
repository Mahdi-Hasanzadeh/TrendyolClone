import { Box, Grid } from "@mui/material";
import { ProductCard } from "./components.js";
import { products } from "./Products.js";
const AllCard = () => {
  return (
    <Box display="flex" justifyContent={"space-around"}>
      <Grid container mx={5} spacing={2}>
        {products.map((product) => {
          return (
            <Grid key={product.id} item xs={6} justifyContent={"center"}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AllCard;
