const {auth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
// const projectId = 'test-gmc-238009';
const merchantId = '134273058';

async function main() {
  const client = await auth.getClient({
    scopes: 'https://www.googleapis.com/auth/content'
  });
  const url = `https://www.googleapis.com/content/v2.1/accounts/authinfo`;
  const res = await client.request({ url });
  console.log(res.data);
}

main().catch(console.error);