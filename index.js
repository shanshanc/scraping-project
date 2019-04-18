const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true }); // Pass { show: true } to the nightmare constructor to have it create a visible, rendered window where you can watch what is happening.
const vo = require('vo');
const async = require('async');

const urlHomepage = 'https://enhancedecommerce.appspot.com/';
const urlProduct1 = 'https://enhancedecommerce.appspot.com/item/9bdd2';
let urlProducts = [];
// let obj = {};

// Get product links from the homepage
const getLinks = function * () {
  let result = yield nightmare
    .goto(urlHomepage)
    .inject('js', 'jquery.min.js')
    .wait(1000)
    .evaluate(() => {
      let elements = document.getElementsByClassName("thumbnail");
      let links = [];
      for (let i = 0; i < elements.length; i++) {
        // get product url
        let elem = elements[i].querySelector("a").href;
        links.push(elem); 
      }
      return links;
    });
  
  yield nightmare.end();
  
  return result;
};

let proudctObj = {};

vo(getLinks)((err, result) => {
  urlProducts = result.slice();

  // Visit product page and get product data
  function getProductData(url, cb) {
    const nightmare = new Nightmare();
    // get product id from url
    const beginStr = url.indexOf('item/') + 5;
    const endStr = url.length;
    const id = url.slice(beginStr, endStr);

    nightmare
      .goto(url)
      .wait(1000)
      .evaluate(() => {
        return document.querySelector(".productCard").innerText;
       })
      .end()
      .then(data => {
        let splitted = data.split('\n');
        let name = splitted[0];
        let price = parseFloat(splitted[1].slice(-5));
        let description = splitted[2];
        let product = {id: id, url: url, name: name, price: price, description: description};
        // console.log('product: ', product);
        proudctObj[id] = product;
        // console.log('name: ', name, 'price: ', price, 'desc: ', description);
        console.log(proudctObj);
      })
      .catch(err => {
        console.log('failed: ', err);
    });

    
  }

  async.each(urlProducts, getProductData, function (err) {
    if (err) console.log('Error: ', err);
    console.log('done');
    // console.log(proudctObj);
  });

});



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

