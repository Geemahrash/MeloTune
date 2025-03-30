const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_RESPONSE_TYPE = 'token';
const SPOTIFY_SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative'
].join(' ');

export const SPOTIFY_AUTH_URL = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&response_type=${SPOTIFY_RESPONSE_TYPE}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(SPOTIFY_SCOPES)}`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const getSpotifyToken = () => {
  return localStorage.getItem('spotify_token');
};

export const setSpotifyToken = (token) => {
  localStorage.setItem('spotify_token', token);
};

export const removeSpotifyToken = () => {
  localStorage.removeItem('spotify_token');
}; 