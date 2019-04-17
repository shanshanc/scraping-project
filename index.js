const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true }); // Pass { show: true } to the nightmare constructor to have it create a visible, rendered window where you can watch what is happening.
const vo = require('vo');

const urlHomepage = 'https://enhancedecommerce.appspot.com/';
const urlProduct1 = 'https://enhancedecommerce.appspot.com/item/9bdd2';

const run = function * () {
  let result = yield nightmare
    .goto(urlHomepage)
    .inject('js', 'jquery.min.js')
    .wait(1000)
    .evaluate(() => {
      // return document.querySelector(".thumbnail a").href;
      let elements = document.getElementsByClassName("thumbnail");
      let links = [];
      for (let i = 0; i < elements.length; i++) {
        let elem = elements[i].querySelector("a").href;
        // console.log(elem);
        links.push(elem);
      }
      return links;
      // let hrefs = [];
      // let links = document.querySelectorAll(".thumbnail > a").href;
      // return links;
    });
  
  yield nightmare.end();
  return result;

};

vo(run)((err, result) => {
  console.log(result);
});


// Get a list of products from the all t-shirts page
// let selector = 'thumbnail';
// nightmare
//   .goto(urlHomepage)
//   .wait(1000)
//   .evaluate((selector) => {
//     let elements =  document.getElementsByClassName(selector);
//     for (let i = 0; i < elements.length; i++) {
//       console.log(elements[i]);
//     }
//     // return elements;
//   }, selector)
//   .end()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log('failed: ', err);
//   });


// Click to a product page from the homepage
// nightmare
//   .goto(urlHomepage)
//   .click('#homepage-9bdd2-1')
//   .wait(2000)
//   .evaluate(() => document.querySelector(".productCard").innerText)
//   .end()
//   .then(console.log)
//   .catch(err => {
//     console.log('failed: ', err);
//   });

// Get product id
// let productId = {};

// nightmare
//   .goto(urlProduct1)
//   .wait(3000)
//   .url()
//   .end()
//   .then(res => {
//     let beginStr = res.indexOf('item/') + 5;
//     let endStr = res.length;
//     let id = res.slice(beginStr, endStr);
//     productId[id] = id;
//     console.log(productId);
//   })
//   .catch(err => {
//     console.log('failed: ', err);
//   });

// Get product title, description, and price
// let productInfo = {};

// nightmare
//   .goto(urlProduct1)
//   .wait(1000)
//   .evaluate(() => document.querySelector(".productCard").innerText)
//   //.evaluate(() => document.body.innerHTML)
//   .end()
//   .then(console.log)
//   .catch(err => {
//     console.log('failed: ', err);
//   });

