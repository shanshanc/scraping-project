'use strict'

const bcrypt = require('/bcrypt');
const saltRounds = 3;

const { google } = require('googleapis');
const key = require('../output/feed-example.json');
const scopes = 'https://www.googleapis.com/auth/content';
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);

process.env.GOOGLE_APPLICATION_CREDENTIALS = '../output/feed-example.json';

const jwtHeader = {
  "type": "JWT",
  "alg": "HS256"
}

const payload = { 
  "availability": "in stock",
  "brand": "Codeworks",
  "age_group": "adult",
  "color": "yellow",
  "gender": "unisex",
  "size": "M",
  "id": "6c3b2",
  "title": "Zoppix T-Shirt",
  "link": "https://enhancedecommerce.appspot.com/item/6c3b2",
  "price": "95.00 USD",
  "image_link": "https://enhancedecommerce.appspot.com/images/yellowT.png",
  "description": "Adipisicing culpa sint cillum eiusmod. Dolor reprehenderit magna velit non culpa ea dolor laborum est nulla deserunt minim.",
}

const data = Buffer.from(jwtHeader).toString('base64') + '.' + Buffer.from(payload).toString('base64');
const hashedData = bcrypt.hashSync(data, saltRounds);
const signature = Buffer.from(hashedData).toString('base64');

jwt.authorize((err, response) => {
  console.log('hello');
  console.log(response);
  // google.analytics('v3').data.ga.get(
  //   {
  //     auth: jwt,
  //     ids: 'ga:' + view_id,
  //     'start-date': '30daysAgo',
  //     'end-date': 'today',
  //     metrics: 'ga:pageviews'
  //   },
  //   (err, result) => {
  //     console.log(err, result)
  //   }
  // )
})