const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true }); // Pass { show: true } to the nightmare constructor to have it create a visible, rendered window where you can watch what is happening.
const vo = require('vo');
const async = require('async');

const urlHomepage = 'https://enhancedecommerce.appspot.com/';
const urlProduct1 = 'https://enhancedecommerce.appspot.com/item/9bdd2';
let urlProducts = [];

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
    const sku = url.slice(beginStr, endStr);

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
        let price = splitted[1].slice(-5) + ' USD';
        let description = splitted[2];
        let product = {sku: sku, link: url, name: name, price: price, description: description};
        proudctObj[sku] = product;
        console.log(proudctObj); // eslint-disable-line
      })
      .catch(err => {
        console.log('failed: ', err); // eslint-disable-line
    });
  }

  async.each(urlProducts, getProductData, function (err) {
    if (err) console.log('Error: ', err); // eslint-disable-line
    console.log('done'); // eslint-disable-line
  });
});
