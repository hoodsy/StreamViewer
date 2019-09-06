// const { google } = require('googleapis');

// const { client, verify } = require('./googleAuth');

// const youtube = google.youtube({
//   version: 'v3',
//   auth: client
//   // auth: process.env.YOUTUBE_KEY
// });

// // async function search() {}

// // API
// // https://developers.google.com/youtube/v3/live/docs/liveChatMessages
// const messages = {
//   list: async function(token, liveChatId) {
//     client.credentials = { access_token: token };

//     const auth = await verify(token).catch(console.error);
//     console.log(auth);

//     const res = await youtube.liveChatMessages.list({
//       liveChatId: 'UCeqUUXaM75wrK5Aalo6UorQ',
//       part: 'id,snippet'
//     });
//     console.log(res);
//   }
// };

// // messages.list();
// module.exports = {
//   messages
// };
