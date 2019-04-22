const https = require('https');

https.get('https://www.googleapis.com/content/v2/134273058/accounts/authinfo', (res) => {
  console.log(res.statusCode); // eslint-disable-line

}).on('error', e => console.error(e)); // eslint-disable-line

/*
https.get('https://www.googleapis.com/content/v2/134273058/products', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation); // eslint-disable-line
  });

}).on("error", (err) => {
  console.log("Error: " + err.message); // eslint-disable-line
});
*/