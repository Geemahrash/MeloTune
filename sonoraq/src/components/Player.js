import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from '@mui/icons-material';
import {
  getCurrentPlayback,
  pausePlayback,
  resumePlayback,
  skipToNext,
  skipToPrevious,
  setVolume,
} from '../services/spotifyService';

const Player = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCurrentTrack = async () => {
    try {
      const response = await getCurrentPlayback();
      if (response.is_playing) {
        setCurrentTrack(response.item);
        setIsPlaying(true);
        setVolume(response.device.volume_percent);
      }
    } catch (error) {
      console.error('Error fetching current track:', error);
      setError('Failed to update player state');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await pausePlayback();
      } else {
        await resumePlayback();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback:', error);
      setError('Failed to control playback');
    }
  };

  const handleSkipNext = async () => {
    try {
      await skipToNext();
      fetchCurrentTrack();
    } catch (error) {
      console.error('Error skipping to next track:', error);
      setError('Failed to skip track');
    }
  };

  const handleSkipPrevious = async () => {
    try {
      await skipToPrevious();
      fetchCurrentTrack();
    } catch (error) {
      console.error('Error skipping to previous track:', error);
      setError('Failed to skip track');
    }
  };

  const handleVolumeChange = async (event, newValue) => {
    try {
      await setVolume(newValue);
      setVolume(newValue);
    } catch (error) {
      console.error('Error changing volume:', error);
      setError('Failed to change volume');
    }
  };

  if (!currentTrack) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <img
            src={currentTrack.album.images[2]?.url}
            alt={currentTrack.name}
            style={{ width: 56, height: 56, marginRight: 16 }}
          />
          <Box>
            <Typography variant="subtitle1" noWrap>
              {currentTrack.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {currentTrack.artists.map(artist => artist.name).join(', ')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleSkipPrevious}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton onClick={handleSkipNext}>
            <SkipNext />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%', gap: 2 }}>
          <VolumeUp />
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={100}
            sx={{ width: 100 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Player; 