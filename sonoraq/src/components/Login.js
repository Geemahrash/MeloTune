import React, { useState } from 'react';
import { Box, Button, Container, Typography, CircularProgress } from '@mui/material';
import { SPOTIFY_AUTH_URL } from '../config/spotify';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = SPOTIFY_AUTH_URL;
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          SonoraQ
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your personal music streaming companion
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleLogin}
          disabled={isLoading}
          sx={{
            mt: 4,
            backgroundColor: '#1DB954',
            '&:hover': {
              backgroundColor: '#1ed760',
            },
            minWidth: 200,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Login with Spotify'
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default Login; 