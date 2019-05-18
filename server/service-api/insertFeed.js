const {auth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
const merchantId = process.env.GOOGLE_MERCHANT_ID;
const host = process.env.HOST;
const port = process.env.PORT;
const country = process.env.COUNTRY;
const language = process.env.LANGUAGE;

const oneFeed = {
  contentType: "products",
  fileName: "productfeed",
  name: "productfeed",
  targets: [
    {
      country: country,
      language: language
    }
  ],
  "fetchSchedule": {
    "hour": 12,
    "fetchUrl": `${host}:${port}`
   }
}
const stringifiedObj = JSON.stringify(oneFeed);

async function main() {
  const client = await auth.getClient({
    scopes: 'https://www.googleapis.com/auth/content'
  });
  
  await client.request({
    url: `https://www.googleapis.com/content/v2.1/${merchantId}/datafeeds`,
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: stringifiedObj
  })
    .then((res) => console.log(res)); // eslint-disable-line
}

main().catch(console.error); // eslint-disable-line
