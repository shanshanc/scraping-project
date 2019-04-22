const {auth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
// const projectId = 'test-gmc-238009';
const merchantId = '134273058';

const oneFeed = {
  contentType: "products",
  fileName: "feed003",
  name: "feed003",
  targets: [
    {
      country: "TW",
      language: "en"
    }
  ],
  "fetchSchedule": {
    "hour": 12,
    "fetchUrl": "http://localhost:4100"
   }
}
const stringifiedObj = JSON.stringify(oneFeed);

async function main() {
  const client = await auth.getClient({
    scopes: 'https://www.googleapis.com/auth/content'
  });
  // const url = `https://www.googleapis.com/content/v2.1/accounts/authinfo`;
  // const res = await client.request({ url });
  await client.request({
    url: 'https://www.googleapis.com/content/v2.1/134273058/datafeeds',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    // body: stringifiedObj
  })
    .then((res) => console.log(res)); 
}

main().catch(console.error);