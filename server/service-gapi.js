// import gapi from 'gapi-client';
const gapi = require('gapi-client');
 
function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': '06a0c2cfc0ce947752893e70e8aaa3ada53a2fa6',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
    'scope': 'https://www.googleapis.com/auth/content'
  }).then(function() {
    console.log('it worked');
  });
}

// Loads the JavaScript client library and invokes `start` afterwards.
start();
