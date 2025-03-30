import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Search as SearchIcon, PlayArrow, Pause } from '@mui/icons-material';
import { searchTracks, playTrack, pausePlayback, resumePlayback } from '../services/spotifyService';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const results = await searchTracks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching tracks:', error);
      setError('Failed to search tracks. Please try again.');
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for songs or artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: isLoading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {searchResults.map((track) => (
          <Grid item xs={12} sm={6} md={4} key={track.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={track.album.images[0]?.url}
                alt={track.name}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" noWrap>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {track.artists.map(artist => artist.name).join(', ')}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handlePlayPause(track)}>
                    {currentTrack?.id === track.id && isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search; 