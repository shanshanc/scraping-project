const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true }); // Pass { show: true } to the nightmare constructor to have it create a visible, rendered window where you can watch what is happening.

const urlHomepage = 'https://enhancedecommerce.appspot.com/';
const urlProduct1 = 'https://enhancedecommerce.appspot.com/item/9bdd2';

// Click to a product page from the homepage
// nightmare
//   .goto(urlHomepage)
//   .click('#homepage-9bdd2-1')
//   .wait(3000)
//   .end()
//   .then(console.log)
//   .catch(err => {
//     console.log('failed: ', err);
//   });

// Get product id
let productId = {};

nightmare
  .goto(urlProduct1)
  .wait(3000)
  .url()
  .end()
  .then(res => {
    let beginStr = res.indexOf('item/') + 5;
    let endStr = res.length;
    let id = res.slice(beginStr, endStr);
    productId[id] = id;
    console.log(productId);
  })
  .catch(err => {
    console.log('failed: ', err);
  });

// Get product title, description, and price


