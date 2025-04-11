import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginSuccess from "./components/LoginSuccess";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

// Create a game-styled theme with enhanced visual effects
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF3B3B", // Pokemon red
      light: "#FF6B6B",
      dark: "#CC0000",
    },
    secondary: {
      main: "#3B4CCA", // Pokemon blue
      light: "#6B7BFF",
      dark: "#0000CC",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    error: {
      main: "#FF3B3B",
    },
    success: {
      main: "#4CAF50",
    },
    info: {
      main: "#3B4CCA",
    },
    warning: {
      main: "#FFC107",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 700,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          gameTitle: 'h4',
        },
      },
      styleOverrides: {
        root: {
          '&.game-title': {
            fontFamily: '"Press Start 2P", cursive',
          },
        },
      },
      variants: [
        {
          props: { variant: 'gameTitle' },
          style: {
            fontFamily: '"Press Start 2P", cursive',
            fontWeight: 700,
            fontSize: '1.2rem',
            letterSpacing: '1px',
            color: '#FFD700',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 700,
          padding: "10px 20px",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
          },
        },
        contained: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #FF6B6B 0%, #FF3B3B 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #FF5C5C 0%, #CC0000 100%)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #6B7BFF 0%, #3B4CCA 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5C6BFF 0%, #0000CC 100%)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
          },
        },
        elevation1: {
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
        },
        elevation2: {
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        },
        elevation4: {
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: "hidden",
          transition: "all 0.3s ease",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.05)',
    '0 4px 8px rgba(0, 0, 0, 0.05)',
    '0 8px 16px rgba(0, 0, 0, 0.05)',
    '0 12px 24px rgba(0, 0, 0, 0.05)',
    '0 16px 32px rgba(0, 0, 0, 0.05)',
    '0 20px 40px rgba(0, 0, 0, 0.05)',
    ...Array(18).fill('none'),
  ],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
