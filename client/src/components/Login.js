import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Fade,
} from "@mui/material";
import config from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const pokemonStyles = {
    fonts: {
      heading: "'Press Start 2P', cursive",
      subheading: "'Press Start 2P', cursive",
    },
    colors: {
      red: "#FF3B3B",
      blue: "#3B4CCA",
      yellow: "#FFDE00",
      black: "#2A2A2A",
    },
    shadows: {
      soft: "0 4px 8px rgba(0, 0, 0, 0.1)",
      medium: "0 6px 12px rgba(0, 0, 0, 0.15)",
      hard: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
  };

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
      {/* Left side login panel - 40% width */}
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
        <Fade in={true} timeout={800}>
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
                color: pokemonStyles.colors.red,
                mb: 3,
                fontFamily: pokemonStyles.fonts.heading,
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Sign In Apeksha
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                InputLabelProps={{
                  sx: {
                    fontFamily: pokemonStyles.fonts.heading,
                    fontSize: "15px",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease",
                    fontFamily: pokemonStyles.fonts.heading,
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputLabelProps={{
                  sx: {
                    fontFamily: pokemonStyles.fonts.heading,
                    fontSize: "15px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    fontFamily: pokemonStyles.fonts.heading,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease",
                  },
                }}
              />

              {error && (
                <Typography color="error" align="center" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: pokemonStyles.colors.red,
                  color: "#FFFFFF",
                  fontFamily: pokemonStyles.fonts.heading,
                  fontSize: "12px",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    background: "#CC0000",
                    transform: "translateY(-4px) scale(1.05)",
                    boxShadow: "0 8px 16px rgba(255, 59, 59, 0.3)",
                  },
                }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{
                      fontFamily: pokemonStyles.fonts.heading,
                      color: "#3B4CCA",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#0000CC",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
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

export default Login;
