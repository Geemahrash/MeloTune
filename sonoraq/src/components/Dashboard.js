import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { getUserPlaylists, getRecentlyPlayed, playTrack, pausePlayback, resumePlayback } from '../services/spotifyService';

const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [playlistsData, recentlyPlayedData] = await Promise.all([
        getUserPlaylists(),
        getRecentlyPlayed()
      ]);
      setPlaylists(playlistsData);
      setRecentlyPlayed(recentlyPlayedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load your data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = async (track) => {
    try {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          await pausePlayback();
        } else {
          await resumePlayback();
        }
        setIsPlaying(!isPlaying);
      } else {
        await playTrack(`spotify:track:${track.id}`);
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing track:', error);
      setError('Failed to play track. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Playlists
      </Typography>
      <Grid container spacing={3}>
        {playlists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={playlist.images[0]?.url}
                alt={playlist.name}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {playlist.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Recently Played
      </Typography>
      <Grid container spacing={2}>
        {recentlyPlayed.map((item) => (
          <Grid item xs={12} key={item.track.id}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 60, height: 60, mr: 2 }}
                  image={item.track.album.images[2]?.url}
                  alt={item.track.name}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.track.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.track.artists.map(artist => artist.name).join(', ')}
                  </Typography>
                </Box>
                <IconButton onClick={() => handlePlayPause(item.track)}>
                  {currentTrack?.id === item.track.id && isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 