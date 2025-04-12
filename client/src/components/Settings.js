import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Paper,
  Fade,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import config from "../config";

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savingTag, setSavingTag] = useState(false);
  const [playerTag, setPlayerTag] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Get user data including player tag if exists
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.apiBaseUrl}/api/user/data`, {
          headers: {
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUserData(userData);
        if (userData.playerTag) {
          setPlayerTag(userData.playerTag);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!playerTag.trim()) {
      setError("Player tag is required");
      return;
    }

    try {
      setSavingTag(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${config.apiBaseUrl}/api/user/player-tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ playerTag }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save player tag");
      }

      setSuccess("Player tag saved successfully!");
      setUserData(data);
    } catch (error) {
      console.error("Error saving player tag:", error);
      setError(error.message || "Failed to save player tag");
    } finally {
      setSavingTag(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mt: 4,
              maxWidth: 800,
              mx: "auto",
              backgroundColor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate("/dashboard")}
                sx={{ 
                  color: "#3B4CCA", 
                  mr: 2,
                  "&:hover": {
                    backgroundColor: "rgba(59, 76, 202, 0.1)",
                  }
                }}
              >
                Back
              </Button>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: "#FF3B3B",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Settings
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: "#3B4CCA" }} />
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: 3, color: "#3B4CCA" }}>
                  Clash Royale Player Tag
                </Typography>

                <TextField
                  fullWidth
                  label="Player Tag"
                  value={playerTag}
                  onChange={(e) => setPlayerTag(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  placeholder="#XXXXXXXX"
                  helperText="Example: #V2RJUG0P"
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    {success}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={savingTag}
                  sx={{
                    background: "#FF3B3B",
                    color: "#FFFFFF",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    "&:hover": {
                      background: "#CC0000",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(255, 59, 59, 0.3)",
                    },
                  }}
                >
                  {savingTag ? <CircularProgress size={24} color="inherit" /> : "Save"}
                </Button>
              </Box>
            )}
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Settings; 