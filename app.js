const clientId = "10ff71b2181a4ee19909431870ef03f4";
const redirectUri = "https://extraordinary-pixie-d64a9c.netlify.app";

function getAccessToken() {
    // Redirect the user to the Spotify Accounts service for authentication
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-playback-state`;
    window.location.href = url;
}

const params = new URLSearchParams(window.location.hash.substr(1));
const accessToken = params.get('access_token');
// If the URL contains an access token, use it to initialize the Spotify player
if (accessToken) {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
        name: 'Web Playback SDK Template',
        getOAuthToken: cb => { cb('YOUR_ACCESS_TOKEN'); }, // Replace with a function to get a valid access token
        volume: 0.5
      });
    
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      player.connect();
  };
} else {
  // If there's no access token, initiate the authentication flow
  getAccessToken();
}

