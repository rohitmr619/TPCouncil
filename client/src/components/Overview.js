import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Avatar,
  Chip,
  Divider,
  Paper,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SwordIcon from "@mui/icons-material/Gavel";
import ShieldIcon from "@mui/icons-material/Shield";
import StarIcon from "@mui/icons-material/Star";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import PersonIcon from "@mui/icons-material/Person";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import config from "../config";

const Overview = ({ playerTag }) => {
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!playerTag) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch user stats using the stored player tag
        const response = await fetch(
          `${config.apiBaseUrl}/api/user/player-stats/${playerTag}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch player data");
        }

        const data = await response.json();
        setPlayerData(data);
        setError("");
      } catch (error) {
        console.error("Error fetching player data:", error);
        setError("Failed to load player data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerTag]);

  // Simulated upcoming chests data
  const upcomingChests = [
    { position: "+1", type: "Silver", rarity: "Common" },
    { position: "+2", type: "Gold", rarity: "Rare" },
    { position: "+3", type: "Silver", rarity: "Common" },
    { position: "+4", type: "Silver", rarity: "Common" },
    { position: "+5", type: "Magic", rarity: "Epic" },
    { position: "+6", type: "Silver", rarity: "Common" },
    { position: "+7", type: "Gold", rarity: "Rare" },
    { position: "+8", type: "Giant", rarity: "Legendary" },
  ];

  // Simulated battle data for charts
  const generateBattleData = () => {
    const wins = playerData?.wins || 0;
    const losses = playerData?.losses || 0;

    // Win/Loss pie chart data
    const pieData = [
      { name: "Wins", value: wins },
      { name: "Losses", value: losses },
    ];

    const last5Battles = Array.from({ length: 5 }, (_, i) => {
      const result = Math.random() > 0.5 ? "Win" : "Loss";
      const trophiesChange =
        result === "Win"
          ? Math.floor(Math.random() * 15) + 20
          : -Math.floor(Math.random() * 15) - 20;
      return {
        id: i + 1,
        result,
        trophiesChange,
        opponent: `Player${Math.floor(Math.random() * 1000)}`,
        opponentLevel: Math.floor(Math.random() * 10) + 5,
      };
    });

    // Trophy progression data (by month)
    const trophyProgressionData = Array.from({ length: 6 }, (_, i) => {
      const base = playerData?.trophies
        ? playerData.trophies - Math.floor(Math.random() * 300)
        : 3000;
      return {
        name: getMonthName(i),
        trophies: base + Math.floor(Math.random() * 500),
      };
    });

    // Battle performance radar chart data
    const battlePerformanceData = [
      {
        subject: "Attack",
        score: Math.floor(Math.random() * 40) + 60,
        fullMark: 100,
      },
      {
        subject: "Defense",
        score: Math.floor(Math.random() * 40) + 60,
        fullMark: 100,
      },
      {
        subject: "Strategy",
        score: Math.floor(Math.random() * 40) + 60,
        fullMark: 100,
      },
      {
        subject: "Deck",
        score: Math.floor(Math.random() * 40) + 60,
        fullMark: 100,
      },
      {
        subject: "Elixir",
        score: Math.floor(Math.random() * 40) + 60,
        fullMark: 100,
      },
    ];

    return {
      pieData,
      last5Battles,
      trophyProgressionData,
      battlePerformanceData,
    };
  };

  // Helper function to get month names
  const getMonthName = (monthsAgo) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toLocaleString("default", { month: "short" });
  };

  const {
    pieData,
    last5Battles,
    trophyProgressionData,
    battlePerformanceData,
  } = playerData
    ? generateBattleData()
    : {
        pieData: [],
        last5Battles: [],
        trophyProgressionData: [],
        battlePerformanceData: [],
      };

  // Colors for the pie chart
  const COLORS = ["#FF3B3B", "#3B4CCA"];

  // Pokemon-styled component styling
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

  // Gradient background styles for chart elements
  const chartBg = {
    background: "white",
    border: "1px solid #F0F0F0",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: 2,
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card
                sx={{
                  height: "100%",
                  background: "white",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <CardContent>
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="40%" height={60} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderLeft: "5px solid #FF3B3B",
            backgroundColor: "rgba(255, 59, 59, 0.05)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#FF3B3B" }}>
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!playerData) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderLeft: "5px solid #3B4CCA",
            backgroundColor: "rgba(59, 76, 202, 0.05)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#3B4CCA" }}>
            No player data available. Please check your player tag in settings.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const {
    name,
    trophies,
    bestTrophies,
    wins,
    losses,
    expLevel,
    clan,
    arena,
    currentFavouriteCard,
  } = playerData;

  const winRate =
    wins && losses ? Math.round((wins / (wins + losses)) * 100) : 0;
  const totalBattles = wins + losses || 0;
  const progressToNextLevel = Math.min(65, Math.random() * 100);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Player Header */}
      <Paper
        elevation={1}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
          background: "white",
          border: "1px solid #F0F0F0",
          boxShadow: "0 4px 20px rgba(59, 76, 202, 0.08)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${pokemonStyles.colors.red}, ${pokemonStyles.colors.blue})`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {/* Player Avatar - Replaced with Person-style avatar */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#ffffff",
              border: `4px solid ${pokemonStyles.colors.red}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: { xs: 2, sm: 0 },
              mr: { xs: 0, sm: 3 },
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <PersonIcon
              sx={{ fontSize: 42, color: pokemonStyles.colors.red }}
            />
          </Box>

          {/* Player Info */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: pokemonStyles.colors.red,
                fontFamily: pokemonStyles.fonts.heading,
                fontSize: "1.2rem",
              }}
            >
              {name || "Player"}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "#666",
                fontFamily: pokemonStyles.fonts.subheading,
                fontSize: "0.7rem",
                mt: 1,
              }}
            >
              {playerTag}
            </Typography>

            <Box
              sx={{
                display: "flex",
                mt: 1,
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {clan && (
                <Chip
                  size="small"
                  label={clan.name}
                  sx={{
                    bgcolor: "rgba(59, 76, 202, 0.1)",
                    color: pokemonStyles.colors.blue,
                    fontWeight: "bold",
                    mr: 1,
                    fontFamily: pokemonStyles.fonts.subheading,
                    fontSize: "0.6rem",
                  }}
                />
              )}

              <Chip
                size="small"
                icon={<DiamondIcon fontSize="small" />}
                label={`Level ${expLevel || 0}`}
                sx={{
                  bgcolor: "rgba(255, 59, 59, 0.1)",
                  color: pokemonStyles.colors.red,
                  fontWeight: "bold",
                  fontFamily: pokemonStyles.fonts.subheading,
                  fontSize: "0.6rem",
                }}
              />
            </Box>
          </Box>

          {/* Trophy Display */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: { xs: 2, sm: 0 },
            }}
          >
            <EmojiEventsIcon
              sx={{ color: pokemonStyles.colors.yellow, fontSize: 40, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: pokemonStyles.colors.blue,
                fontFamily: pokemonStyles.fonts.heading,
                fontSize: "1.2rem",
              }}
            >
              {trophies || 0}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#666",
                fontFamily: pokemonStyles.fonts.subheading,
                fontSize: "0.6rem",
              }}
            >
              TROPHIES
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ px: 3, pb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontFamily: pokemonStyles.fonts.subheading,
                fontSize: "0.6rem",
              }}
            >
              Progress to Level {(expLevel || 0) + 1}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontFamily: pokemonStyles.fonts.subheading,
                fontSize: "0.6rem",
              }}
            >
              {progressToNextLevel}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressToNextLevel}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(59, 76, 202, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: pokemonStyles.colors.blue,
              },
            }}
          />
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(59, 76, 202, 0.08)",
              background: "white",
              transform: "perspective(1000px)",
              borderTop: `4px solid ${pokemonStyles.colors.blue}`,
              borderRadius: 2,
              "&:hover": {
                transform: "perspective(1000px) translateY(-8px)",
                boxShadow: "0 8px 25px rgba(59, 76, 202, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DiamondIcon
                  sx={{ color: pokemonStyles.colors.yellow, mr: 1.5 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: pokemonStyles.colors.blue,
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    fontFamily: pokemonStyles.fonts.heading,
                  }}
                >
                  Highest Trophies
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: pokemonStyles.colors.blue,
                  textAlign: "center",
                  my: 2,
                  fontSize: "2rem",
                  fontFamily: pokemonStyles.fonts.heading,
                }}
              >
                {bestTrophies || 0}
              </Typography>
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #F0F0F0" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontFamily: pokemonStyles.fonts.subheading,
                    fontSize: "0.7rem",
                  }}
                >
                  Current: {trophies || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(255, 59, 59, 0.08)",
              background: "white",
              transform: "perspective(1000px)",
              borderTop: "4px solid #FF3B3B",
              borderRadius: 2,
              "&:hover": {
                transform: "perspective(1000px) translateY(-8px)",
                boxShadow: "0 8px 25px rgba(255, 59, 59, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ShowChartIcon sx={{ color: "#FF3B3B", mr: 1.5 }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FF3B3B",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    fontFamily: pokemonStyles.fonts.heading,
                  }}
                >
                  Win Rate
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#FF3B3B",
                  textAlign: "center",
                  my: 2,
                  fontSize: "2rem",
                  fontFamily: pokemonStyles.fonts.heading,
                }}
              >
                {winRate}%
              </Typography>
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #F0F0F0" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontFamily: pokemonStyles.fonts.subheading,
                    fontSize: "0.7rem",
                  }}
                >
                  Battles: {totalBattles}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(76, 175, 80, 0.08)",
              background: "white",
              transform: "perspective(1000px)",
              borderTop: "4px solid #4CAF50",
              borderRadius: 2,
              "&:hover": {
                transform: "perspective(1000px) translateY(-8px)",
                boxShadow: "0 8px 25px rgba(76, 175, 80, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SwordIcon sx={{ color: "#4CAF50", mr: 1.5 }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#4CAF50",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    fontFamily: pokemonStyles.fonts.heading,
                  }}
                >
                  Wins
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#4CAF50",
                  textAlign: "center",
                  my: 2,
                  fontSize: "2rem",
                  fontFamily: pokemonStyles.fonts.heading,
                }}
              >
                {wins || 0}
              </Typography>
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #F0F0F0" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontFamily: pokemonStyles.fonts.subheading,
                    fontSize: "0.7rem",
                  }}
                >
                  Win Streak: {Math.floor(Math.random() * 10)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(244, 67, 54, 0.08)",
              background: "white",
              transform: "perspective(1000px)",
              borderTop: "4px solid #F44336",
              borderRadius: 2,
              "&:hover": {
                transform: "perspective(1000px) translateY(-8px)",
                boxShadow: "0 8px 25px rgba(244, 67, 54, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ShieldIcon sx={{ color: "#F44336", mr: 1.5 }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#F44336",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    fontFamily: pokemonStyles.fonts.heading,
                  }}
                >
                  Losses
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#F44336",
                  textAlign: "center",
                  my: 2,
                  fontSize: "2rem",
                  fontFamily: pokemonStyles.fonts.heading,
                }}
              >
                {losses || 0}
              </Typography>
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #F0F0F0" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontFamily: pokemonStyles.fonts.subheading,
                    fontSize: "0.7rem",
                  }}
                >
                  Loss Rate: {100 - winRate}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              transition: "all 0.3s ease",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(33, 150, 243, 0.08)", // blue tone
              background: "white",
              transform: "perspective(1000px)",
              borderTop: "4px solid #2196F3", // blue
              borderRadius: 2,
              "&:hover": {
                transform: "perspective(1000px) translateY(-8px)",
                boxShadow: "0 8px 25px rgba(33, 150, 243, 0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmojiEventsIcon sx={{ color: "#2196F3", mr: 1.5 }} />{" "}
                {/* Trophy-like icon for Arena */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2196F3",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    fontFamily: pokemonStyles.fonts.heading,
                  }}
                >
                  Arena
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#2196F3",
                  textAlign: "center",
                  my: 2,
                  fontSize: "1.3rem",
                  fontFamily: pokemonStyles.fonts.heading,
                }}
              >
                {arena?.name || "Unknown"}
              </Typography>
              {/* Trophy Range section has been removed */}
            </CardContent>
          </Card>
        </Grid>

        {currentFavouriteCard && (
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.3s ease",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(59, 76, 202, 0.08)", // blue tone
                background: "white",
                transform: "perspective(1000px)",
                borderTop: `4px solid ${pokemonStyles.colors.blue}`,
                borderRadius: 2,
                "&:hover": {
                  transform: "perspective(1000px) translateY(-8px)",
                  boxShadow: "0 8px 25px rgba(59, 76, 202, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SportsEsportsIcon
                    sx={{ color: pokemonStyles.colors.blue, mr: 1.5 }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      color: pokemonStyles.colors.blue,
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      fontFamily: pokemonStyles.fonts.heading,
                    }}
                  >
                    Favorite Card
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: pokemonStyles.colors.blue,
                    textAlign: "center",
                    my: 2,
                    fontSize: "1.2rem",
                    fontFamily: pokemonStyles.fonts.heading,
                  }}
                >
                  {currentFavouriteCard.name || "Unknown Card"}
                </Typography>
                <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #F0F0F0" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontFamily: pokemonStyles.fonts.subheading,
                      fontSize: "0.7rem",
                      textAlign: "center",
                    }}
                  >
                    {currentFavouriteCard.rarity || "?"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Charts and Additional Info */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Win/Loss Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              height: "100%",
              ...chartBg,
              borderTop: `4px solid ${pokemonStyles.colors.red}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: pokemonStyles.colors.red,
                fontFamily: pokemonStyles.fonts.heading,
                fontSize: "0.8rem",
              }}
            >
              Win/Loss Ratio
            </Typography>
            <Box
              sx={{
                height: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${((value / (wins + losses)) * 100).toFixed(0)}%`,
                      name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Trophy Progression */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              height: "100%",
              ...chartBg,
              borderTop: `4px solid ${pokemonStyles.colors.blue}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: pokemonStyles.colors.blue,
                fontFamily: pokemonStyles.fonts.heading,
                fontSize: "0.8rem",
              }}
            >
              Trophy Progression
            </Typography>
            <Box sx={{ height: 250, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trophyProgressionData.slice().reverse()}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                  <Tooltip
                    formatter={(value) => [`${value} Trophies`, "Trophies"]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="trophies"
                    stroke={pokemonStyles.colors.blue}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Battle Performance Analysis */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              height: "100%",
              ...chartBg,
              borderTop: `4px solid ${pokemonStyles.colors.yellow}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: pokemonStyles.colors.yellow,
                fontFamily: pokemonStyles.fonts.heading,
                fontSize: "0.8rem",
              }}
            >
              Battle Performance
            </Typography>
            <Box
              sx={{
                height: 250,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="65%"
                  data={battlePerformanceData}
                >
                  <PolarGrid stroke="#E0E0E0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#666666" }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Player"
                    dataKey="score"
                    stroke={pokemonStyles.colors.red}
                    fill={pokemonStyles.colors.red}
                    fillOpacity={0.3}
                  />
                  <Tooltip formatter={(value) => [`${value}/100`, "Rating"]} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Upcoming Chests */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          ...chartBg,
          borderTop: `4px solid ${pokemonStyles.colors.yellow}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: pokemonStyles.colors.yellow,
            fontFamily: pokemonStyles.fonts.heading,
            fontSize: "0.8rem",
          }}
        >
          Upcoming Chests
        </Typography>

        <Grid container spacing={2}>
          {upcomingChests.map((chest, index) => (
            <Grid item xs={6} sm={3} md={1.5} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor:
                    chest.rarity === "Legendary"
                      ? "rgba(255, 215, 0, 0.1)"
                      : chest.rarity === "Epic"
                      ? "rgba(156, 39, 176, 0.1)"
                      : chest.rarity === "Rare"
                      ? "rgba(59, 76, 202, 0.1)"
                      : "rgba(158, 158, 158, 0.1)",
                  border:
                    chest.rarity === "Legendary"
                      ? "1px solid #FFD700"
                      : chest.rarity === "Epic"
                      ? "1px solid #9C27B0"
                      : chest.rarity === "Rare"
                      ? "1px solid #3B4CCA"
                      : "1px solid #9E9E9E",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", color: "#666" }}
                >
                  {chest.position}
                </Typography>

                {chest.rarity === "Legendary" ? (
                  <StarIcon sx={{ color: "#FFD700", fontSize: 32, my: 1 }} />
                ) : chest.rarity === "Epic" ? (
                  <StarIcon sx={{ color: "#9C27B0", fontSize: 32, my: 1 }} />
                ) : chest.rarity === "Rare" ? (
                  <LockOpenIcon
                    sx={{ color: "#3B4CCA", fontSize: 32, my: 1 }}
                  />
                ) : (
                  <LockIcon sx={{ color: "#9E9E9E", fontSize: 32, my: 1 }} />
                )}

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  {chest.type}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Battles */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          ...chartBg,
          borderTop: `4px solid ${pokemonStyles.colors.blue}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: pokemonStyles.colors.blue,
            fontFamily: pokemonStyles.fonts.heading,
            fontSize: "0.8rem",
          }}
        >
          Recent Battles
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    fontFamily: pokemonStyles.fonts.subheading,
                    fontSize: "0.6rem",
                    fontWeight: "bold",
                    color: pokemonStyles.colors.blue,
                    borderBottom: `2px solid ${pokemonStyles.colors.blue}`,
                  },
                }}
              >
                <TableCell>Battle</TableCell>
                <TableCell>Opponent</TableCell>
                <TableCell>Result</TableCell>
                <TableCell align="right">Trophies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {last5Battles.map((battle) => (
                <TableRow
                  key={battle.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "rgba(0, 0, 0, 0.02)" },
                    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                    "& td": {
                      fontFamily: pokemonStyles.fonts.subheading,
                      fontSize: "0.6rem",
                      py: 1,
                    },
                  }}
                >
                  <TableCell>Battle #{battle.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {battle.opponent}
                      <Chip
                        label={`Lvl ${battle.opponentLevel}`}
                        size="small"
                        sx={{
                          ml: 1,
                          bgcolor: "rgba(255, 59, 59, 0.1)",
                          color: pokemonStyles.colors.red,
                          height: 20,
                          fontFamily: pokemonStyles.fonts.subheading,
                          fontSize: "0.5rem",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        battle.result === "Win"
                          ? "#4CAF50"
                          : pokemonStyles.colors.red,
                      fontWeight: "bold",
                    }}
                  >
                    {battle.result}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        battle.trophiesChange > 0
                          ? "#4CAF50"
                          : pokemonStyles.colors.red,
                      fontWeight: "bold",
                    }}
                  >
                    {battle.trophiesChange > 0
                      ? `+${battle.trophiesChange}`
                      : battle.trophiesChange}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Overview;
