import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: `url(${process.env.PUBLIC_URL}/background.jpg) center/cover no-repeat`,
        position: "relative",
      }}
    >
      {/* Left side success panel - 40% width */}
      <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.81)",
          backdropFilter: "blur(1px)",
          boxShadow: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "450px",
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: "#FF3B3B",
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Success!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#3B4CCA",
              textAlign: "center",
              mb: 3,
            }}
          >
            Welcome to TiltProof Council
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              textAlign: "center",
              mb: 4,
            }}
          >
            Your account has been created successfully. The dashboard will be
            available soon.
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "#FF3B3B",
              color: "#FFFFFF",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": {
                background: "#CC0000",
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "0 8px 16px rgba(255, 59, 59, 0.3)",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Return to Login
          </Button>
        </Box>
      </Box>

      {/* Right side background - 60% width */}
      <Box
        sx={{
          width: "60%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.5)",
        }}
      />
    </Box>
  );
};

export default LoginSuccess;
