const functions = require('firebase-functions');

exports.corsConfig = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', 'http://localhost:8100');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(200).send('');
  } else {
    response.status(404).send('Not Found');
  }
});