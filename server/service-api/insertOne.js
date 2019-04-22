const {auth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
// const projectId = 'test-gmc-238009';
const merchantId = '134273058';

const oneProudct = {
  "channel": "online",
  "contentLanguage": "en",
  "offerId": "6c3b3",
  "targetCountry": "TW",
  "availability": "in stock",
  "id": "6c3b3",
  "link": "https://enhancedecommerce.appspot.com/item/6c3b2",
  "imageLink": "https://enhancedecommerce.appspot.com/images/yellowT.png",
  "title": "Test T-Shirt One",
  "price": {
    "value": "99",
    "currency": "USD"
  },
  "description": "Adipisicing culpa sint cillum eiusmod. Dolor reprehenderit magna velit non culpa ea dolor laborum est nulla deserunt minim."
}
const stringifiedObj = JSON.stringify(oneProudct);

async function main() {
  const client = await auth.getClient({
    scopes: 'https://www.googleapis.com/auth/content'
  });
  // const url = `https://www.googleapis.com/content/v2.1/accounts/authinfo`;
  // const res = await client.request({ url });
  await client.request({
    url: 'https://www.googleapis.com/content/v2.1/134273058/products',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: stringifiedObj
  })
    .then((res) => console.log(res)); 
}

main().catch(console.error);