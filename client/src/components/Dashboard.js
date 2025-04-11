import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Fade,
  CircularProgress,
  Tabs,
  Tab,
  Container,
  Alert,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [playerTag, setPlayerTag] = useState("");
  const [trophyCount, setTrophyCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user's player tag and trophy count
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/user/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data response:", response.data);
        if (response.data.playerTag) {
          setPlayerTag(response.data.playerTag);
          setTrophyCount(response.data.trophyCount);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setApiError(err.response?.data?.message || "Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setApiError(null);

    try {
      const token = localStorage.getItem("token");
      console.log("Submitting player tag:", playerTag);
      const response = await axios.post(
        "http://localhost:5000/api/user/player-tag",
        { playerTag },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Player tag response:", response.data);
      setTrophyCount(response.data.trophyCount);
      setPlayerTag(response.data.playerTag);
    } catch (err) {
      console.error("Error submitting player tag:", err);
      setError(err.response?.data?.message || "An error occurred");
      setApiError(err.response?.data?.details || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", pt: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            centered
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                color: "#3B4CCA",
                fontSize: "0.9rem",
                fontWeight: "bold",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#FF3B3B",
                },
              },
            }}
          >
            <Tab label="Dashboard" />
            <Tab label="Friends" />
            <Tab label="Leaderboard" />
          </Tabs>

          <Fade in={true} timeout={800}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                maxWidth: 800,
                mx: "auto",
                backgroundColor: "background.paper",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{
                  color: "#FF3B3B",
                  mb: 4,
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Dashboard
              </Typography>

              {apiError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {apiError}
                </Alert>
              )}

              {!playerTag ? (
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, color: "#3B4CCA", textAlign: "center" }}
                  >
                    Enter your Clash Royale Player Tag
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
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
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
                  >
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "#3B4CCA" }}
                  >
                    Your Player Tag: {playerTag}
                  </Typography>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#FF3B3B",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Trophy Count: {trophyCount !== null ? trophyCount : "Not available"}
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 