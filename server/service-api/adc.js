// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"
// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage({
  projectId: 'test-gmc-238009',
  keyFilename: '../output/feed-example.json',
});

// Makes an authenticated API request.
storage
  .getBuckets()
  .then(results => {
    const buckets = results[0];

    console.log('Buckets:'); // eslint-disable-line
    buckets.forEach(bucket => {
      console.log(bucket.name); // eslint-disable-line
    });
  })
  .catch(err => {
    console.error('ERROR:', err); // eslint-disable-line
  });