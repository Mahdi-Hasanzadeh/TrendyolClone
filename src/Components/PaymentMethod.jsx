import Paypal from "../assets/icons8-paypal-48.png";
import MasterCard from "../assets/icons8-mastercard-48.png";
import VisaCard from "../assets/icons8-visa-card-48.png";
import ApplePay from "../assets/icons8-apple-pay-64.png";
import { Box, Typography } from "@mui/material";
import { CreditCard } from "@mui/icons-material";
const PaymentMethod = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f3f3f3",
        padding: 1,
      }}
    >
      <Typography
        sx={{
          color: "black",
        }}
      >
        <CreditCard
          sx={{
            verticalAlign: "middle",
            mr: 2,
          }}
        />
        Payment Methods
      </Typography>
      <Box display={"flex"} justifyContent={"center"} gap={2}>
        <img width="35px" src={Paypal} />
        <img width="35px" src={MasterCard} />
        <img width="35px" src={VisaCard} />
        <img width="35px" src={ApplePay} />
      </Box>
    </Box>
  );
};
export default PaymentMethod;
