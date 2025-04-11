import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Grid,
  Fade,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
        "http://localhost:5000/api/auth/register",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/login-success");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
      {/* Left side register panel - 40% width */}
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
                color: "#FF3B3B",
                mb: 3,
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Create Account
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease",
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
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
                  background: "#FF3B3B",
                  color: "#FFFFFF",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    background: "#CC0000",
                    transform: "translateY(-4px) scale(1.05)",
                    boxShadow: "0 8px 16px rgba(255, 59, 59, 0.3)",
                  },
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{
                      color: "#3B4CCA",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#0000CC",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {"Already have an account? Sign In"}
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

export default Register;
