import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import {
  getPlaylistTracks,
  playPlaylist,
  pausePlayback,
  resumePlayback,
} from '../services/spotifyService';

const Playlist = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlaylistData();
  }, [id]);

  const fetchPlaylistData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tracksData = await getPlaylistTracks(id);
      setTracks(tracksData);
    } catch (error) {
      console.error('Error fetching playlist data:', error);
      setError('Failed to load playlist. Please try again later.');
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
        await playPlaylist(`spotify:playlist:${id}`, { uri: `spotify:track:${track.id}` });
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <List>
        {tracks.map((item, index) => (
          <React.Fragment key={item.track.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handlePlayPause(item.track)}>
                  {currentTrack?.id === item.track.id && isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  src={item.track.album.images[2]?.url}
                  alt={item.track.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.track.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.track.artists.map(artist => artist.name).join(', ')}
                    </Typography>
                    {' — '}
                    {item.track.album.name}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < tracks.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Playlist; 