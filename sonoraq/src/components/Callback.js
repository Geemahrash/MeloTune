import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { getTokenFromUrl, setSpotifyToken } from '../config/spotify';

const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = getTokenFromUrl();
        const token = hash.access_token;

        if (token) {
          setSpotifyToken(token);
          navigate('/dashboard');
        } else {
          setError('No access token found. Please try logging in again.');
          setIsProcessing(false);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setError('An error occurred during authentication. Please try again.');
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [navigate]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
      }}
    >
      {isProcessing ? (
        <>
          <CircularProgress />
          <Typography variant="h6">
            Processing login...
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={handleRetry}
            sx={{
              backgroundColor: '#1DB954',
              '&:hover': {
                backgroundColor: '#1ed760',
              },
            }}
          >
            Try Again
          </Button>
        </>
      )}
    </Box>
  );
};

export default Callback; 