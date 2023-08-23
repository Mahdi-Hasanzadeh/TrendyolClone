import { Box, CircularProgress, Modal, Typography } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Modal open={true}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          sx={{
            mr: 2.5,
            color: "orange",
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: "orange",
          }}
        >
          Loading...
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoadingComponent;
