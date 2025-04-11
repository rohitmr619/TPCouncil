import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Fade,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tooltip,
  Avatar,
  Grid,
  Tabs,
  Tab,
  Divider
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Overview from './Overview';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [hasPlayerTag, setHasPlayerTag] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data including player tag
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/user/data", {
          headers: {
            "x-auth-token": token
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const userData = await response.json();
        setUserData(userData);
        setHasPlayerTag(!!userData.playerTag);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Log out handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Pokemon-styled component styling
  const pokemonStyles = {
    fonts: {
      heading: "'Press Start 2P', cursive",
      subheading: "'Press Start 2P', cursive"
    },
    colors: {
      red: '#FF3B3B',
      blue: '#3B4CCA',
      yellow: '#FFDE00',
      black: '#2A2A2A'
    },
    shadows: {
      soft: '0 4px 8px rgba(0, 0, 0, 0.1)',
      medium: '0 6px 12px rgba(0, 0, 0, 0.15)',
      hard: '0 10px 20px rgba(0, 0, 0, 0.2)'
    }
  };

  // Component for when the user doesn't have a player tag
  const NoPlayerTagPrompt = () => (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          background: '#FFFFFF',
          boxShadow: pokemonStyles.shadows.hard,
          position: 'relative',
          overflow: 'hidden',
          maxWidth: 600,
          mx: 'auto',
          border: '3px solid #F0F0F0',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: `linear-gradient(90deg, ${pokemonStyles.colors.red}, ${pokemonStyles.colors.blue})`
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            mx: 'auto', 
            mb: 3,
            background: 'white',
            border: `4px solid ${pokemonStyles.colors.red}`,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '4px',
              background: pokemonStyles.colors.red
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `4px solid ${pokemonStyles.colors.red}`,
              background: 'white'
            }
          }}>
          </Box>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2, 
              fontWeight: "bold",
              fontFamily: pokemonStyles.fonts.heading,
              color: pokemonStyles.colors.blue,
              fontSize: '1.2rem'
            }}
          >
            Welcome Trainer!
          </Typography>
          
          <Box sx={{ 
            borderLeft: `4px solid ${pokemonStyles.colors.red}`, 
            pl: 2, 
            py: 1, 
            mb: 4, 
            bgcolor: 'rgba(255, 59, 59, 0.05)',
            borderRadius: '0 8px 8px 0'
          }}>
            <Typography variant="body1" sx={{ 
              color: '#666', 
              fontWeight: 500, 
              textAlign: 'left',
              fontFamily: pokemonStyles.fonts.subheading,
              fontSize: '0.7rem',
              lineHeight: 1.8
            }}>
              To get started, please add your Clash Royale player tag in settings.
              This will allow us to display your game statistics and track your progress.
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            sx={{
              background: pokemonStyles.colors.red,
              color: "#FFFFFF",
              px: 4,
              py: 1.5,
              fontSize: '0.8rem',
              fontFamily: pokemonStyles.fonts.subheading,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": {
                background: '#CC0000',
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: pokemonStyles.shadows.medium,
              },
            }}
            onClick={() => navigate("/settings")}
          >
            Go to Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: '#F5F5F5',
      backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      position: "relative"
    }}>
      {/* App Bar - Pokemon Themed */}
      <AppBar 
        position="static" 
        sx={{ 
          background: 'white',
          borderBottom: `3px solid ${pokemonStyles.colors.blue}`,
          boxShadow: pokemonStyles.shadows.soft,
          color: '#333333',
          zIndex: 1,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: pokemonStyles.colors.red
          }
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 24, 
              height: 24, 
              mr: 2,
              borderRadius: '50%',
              background: 'white',
              border: `2px solid ${pokemonStyles.colors.red}`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '2px',
                background: pokemonStyles.colors.red
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: `2px solid ${pokemonStyles.colors.red}`,
                background: 'white'
              }
            }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              fontFamily: pokemonStyles.fonts.heading, 
              color: pokemonStyles.colors.red,
              fontSize: '0.8rem',
              mr: 4,
              letterSpacing: '0.5px'
            }}
          >
            Clash Royale Dashboard
          </Typography>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', md: 'block' } }} />
          
          {/* Navigation Tabs in AppBar */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              flexGrow: 1,
              minHeight: 'unset',
              "& .MuiTab-root": {
                fontWeight: "bold",
                fontFamily: pokemonStyles.fonts.subheading,
                fontSize: '0.65rem',
                color: pokemonStyles.colors.blue,
                transition: "all 0.3s ease",
                py: 1,
                minHeight: 'unset',
                mx: 0.5,
                "&:hover": {
                  color: pokemonStyles.colors.red,
                  background: 'rgba(255, 59, 59, 0.05)',
                  borderRadius: '4px 4px 0 0'
                },
                "&.Mui-selected": {
                  color: pokemonStyles.colors.red,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: pokemonStyles.colors.red,
                height: 3,
              },
            }}
          >
            <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Overview" />
            <Tab icon={<LeaderboardIcon fontSize="small" />} iconPosition="start" label="Leaderboard" />
            <Tab icon={<PeopleIcon fontSize="small" />} iconPosition="start" label="Friends" />
            <Tab icon={<TimelineIcon fontSize="small" />} iconPosition="start" label="Win Predictor" />
          </Tabs>
          
          <Tooltip title="Notifications">
            <IconButton 
              sx={{ 
                color: pokemonStyles.colors.blue,
                '&:hover': { color: pokemonStyles.colors.red }
              }}
            >
              <Badge badgeContent={2} sx={{ '& .MuiBadge-badge': { bgcolor: pokemonStyles.colors.red, color: 'white' } }}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton 
              sx={{ 
                mx: 1, 
                color: pokemonStyles.colors.blue,
                '&:hover': { color: pokemonStyles.colors.red }
              }} 
              onClick={() => navigate("/settings")}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Logout">
            <IconButton 
              sx={{ 
                color: pokemonStyles.colors.blue,
                '&:hover': { color: pokemonStyles.colors.red }
              }}
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: "relative", zIndex: 1, py: 3 }}>
        <Fade in={true} timeout={800}>
          <Box>
            {/* Content area */}
            <Box sx={{ px: 3 }}>
              <Paper
                elevation={1}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: pokemonStyles.shadows.medium,
                  overflow: "hidden",
                  width: '100%',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${pokemonStyles.colors.red}, ${pokemonStyles.colors.blue})`
                  },
                  border: '1px solid #EEEEEE'
                }}
              >
                {/* Tab header */}
                <Box sx={{ 
                  mb: 4, 
                  position: "relative",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Box 
                    sx={{ 
                      width: 20, 
                      height: 20,
                      borderRadius: '50%',
                      background: 'white',
                      border: `2px solid ${pokemonStyles.colors.red}`,
                      position: 'relative',
                      mr: 2,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: pokemonStyles.colors.red
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        border: `2px solid ${pokemonStyles.colors.red}`,
                        background: 'white'
                      }
                    }}
                  />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: pokemonStyles.fonts.heading,
                      fontSize: '1rem',
                      color: activeTab === 0 ? pokemonStyles.colors.red :
                             activeTab === 1 ? pokemonStyles.colors.blue :
                             activeTab === 2 ? pokemonStyles.colors.red :
                                              pokemonStyles.colors.blue
                    }}
                  >
                    {activeTab === 0 && "Player Overview"}
                    {activeTab === 1 && "Global Leaderboard"}
                    {activeTab === 2 && "Friends & Clans"}
                    {activeTab === 3 && "Battle Predictor"}
                  </Typography>
                  <Box 
                    sx={{ 
                      width: 20, 
                      height: 20,
                      borderRadius: '50%',
                      background: 'white',
                      border: `2px solid ${pokemonStyles.colors.red}`,
                      position: 'relative',
                      ml: 2,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: pokemonStyles.colors.red
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        border: `2px solid ${pokemonStyles.colors.red}`,
                        background: 'white'
                      }
                    }}
                  />
                </Box>
                
                {loading ? (
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: 'column',
                    justifyContent: "center", 
                    alignItems: 'center',
                    py: 8 
                  }}>
                    <CircularProgress sx={{ color: pokemonStyles.colors.blue, mb: 2 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: pokemonStyles.fonts.heading,
                        fontSize: '0.7rem',
                        color: pokemonStyles.colors.blue
                      }}
                    >
                      Loading...
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {activeTab === 0 && (
                      hasPlayerTag ? (
                        <Overview playerTag={userData?.playerTag} />
                      ) : (
                        <NoPlayerTagPrompt />
                      )
                    )}
                    {activeTab === 1 && (
                      <Box sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="h5" sx={{ color: "#3B4CCA" }}>
                          Leaderboard coming soon...
                        </Typography>
                      </Box>
                    )}
                    {activeTab === 2 && (
                      <Box sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="h5" sx={{ color: "#3B4CCA" }}>
                          Friends feature coming soon...
                        </Typography>
                      </Box>
                    )}
                    {activeTab === 3 && (
                      <Box sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="h5" sx={{ color: "#3B4CCA" }}>
                          Win Predictor coming soon...
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </Paper>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default Dashboard; 