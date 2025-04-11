import React from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#F5F5F5',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: '#FF3B3B',
              mb: 2,
              fontWeight: 'bold',
            }}
          >
            Success!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#3B4CCA',
              textAlign: 'center',
              mb: 3,
            }}
          >
            Welcome to TiltProof Council
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#333',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Your account has been created successfully. The dashboard will be available soon.
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: '#FF3B3B',
              color: '#FFFFFF',
              '&:hover': {
                background: '#CC0000',
              },
            }}
            onClick={() => navigate('/login')}
          >
            Return to Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginSuccess; 