# SonoraQ - Spotify Music Streaming App

A modern web application for streaming music using the Spotify API. Built with React and Material-UI.

## Features

- Spotify authentication
- Browse and play your playlists
- Search for tracks and artists
- Control playback (play, pause, skip, volume)
- Responsive design
- Dark theme

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spotify Developer Account
- Spotify Premium Account (for playback)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sonoraq.git
cd sonoraq
```

2. Install dependencies:
```bash
npm install
```

3. Create a Spotify Developer Application:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Add `http://localhost:3000/callback` to the Redirect URIs
   - Copy the Client ID

4. Create a `.env` file in the root directory and add your Spotify credentials:
```
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

5. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Click "Login with Spotify" to authenticate with your Spotify account
2. Browse your playlists on the dashboard
3. Search for tracks and artists using the search feature
4. Control playback using the player at the bottom of the screen
5. Click on playlists to view and play their tracks

## Technologies Used

- React
- Material-UI
- Spotify Web API
- React Router
- Axios

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
