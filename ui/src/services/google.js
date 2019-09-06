export function authenticate() {
  return window.gapi.auth2
    .getAuthInstance()
    .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
    .then(
      function() {
        console.log('Sign-in successful');
      },
      function(err) {
        console.error('Error signing in', err);
      }
    );
}
// export function storeToken() {
//   const googleUser = window.gauth.currentUser.get();
//   const id_token = googleUser.getAuthResponse().id_token;
//   localStorage.setItem('token', id_token);
// }
export function loadClient() {
  window.gapi.client.setApiKey(process.env.REACT_APP_YOUTUBE_KEY);
  return window.gapi.client
    .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(
      function() {
        console.log('GAPI client loaded for API');
      },
      function(err) {
        console.error('Error loading GAPI client for API', err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
export function fetchStreams() {
  if (!window.gapi.client) return null;
  return window.gapi.client.youtube.search
    .list({
      part: 'snippet',
      eventType: 'live',
      maxResults: 6,
      order: 'viewCount',
      relevanceLanguage: 'en',
      topicId: '/m/0bzvm2',
      type: 'video',
      videoEmbeddable: 'true'
    })
    .then(
      function(response) {
        return response;
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
}
export function fetchStreamDetails(videoId) {
  return window.gapi.client.youtube.videos
    .list({
      id: videoId,
      part: 'snippet,contentDetails,statistics,liveStreamingDetails'
    })
    .then(
      function(response) {
        return response;
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
}
export function fetchMessages(liveChatId) {
  return window.gapi.client.youtube.liveChatMessages
    .list({
      liveChatId: liveChatId,
      part: 'id,snippet'
    })
    .then(
      function(response) {
        return response;
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
}
export function insertMessage({ liveChatId, text }) {
  return window.gapi.client.youtube.liveChatMessages
    .insert({
      part: 'snippet',
      resource: {
        snippet: {
          liveChatId,
          type: 'textMessageEvent',
          textMessageDetails: {
            messageText: text
          }
        }
      }
    })
    .then(
      function(response) {
        return response;
      },
      function(err) {
        console.error('Execute error', err);
      }
    );
}
window.gapi.load('client:auth2', function() {
  window.gauth = window.gapi.auth2.init({
    client_id: process.env.REACT_APP_YOUTUBE_CLIENT_ID
  });
});
