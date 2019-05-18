const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true }); // Pass { show: true } to the nightmare constructor to have it create a visible, rendered window where you can watch what is happening.
const vo = require('vo');

const urlHomepage = 'https://enhancedecommerce.appspot.com/';
let urlProducts = [];

// Get product links from the homepage
const getLinks = function* () {
  let result = yield nightmare
    .goto(urlHomepage)
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

exports.fetchProducts = () => {
  return new Promise((resolve, reject) => {

    vo(getLinks)((err, result) => {
      if (err) reject(err);
      urlProducts = result.slice();
  
      // Visit product page and get product data
      function getProductData(url) {
        const nightmare = new Nightmare();
        // get product id from url`
        const beginStr = url.indexOf('item/') + 5;
        const endStr = url.length;
        const sku = url.slice(beginStr, endStr);
  
        return nightmare
          .goto(url)
          .wait(200)
          .evaluate(() => {
            let obj = {};
            let productCard = document.querySelector(".productCard");
  
            obj.title = productCard.getElementsByClassName("col-sm-12")[0].getElementsByTagName('h2')[0].innerText;
            let price = productCard.getElementsByClassName("col-sm-12")[0].getElementsByTagName('h3')[0].innerText;
            obj.price = price.slice(-5) + ' USD'; // for direct upload to google merchant center
            obj.description = productCard.getElementsByClassName("col-sm-12")[0].getElementsByTagName('p')[0].innerText;
            obj.image_link = productCard.getElementsByClassName("itemPic")[0].getElementsByTagName('img')[0].src;
  
            return obj;
          })
          .end()
          .then(data => {
            console.log('getProductsData\'s then'); // eslint-disable-line
            return Object.assign(data, {
              link: url,
              id: sku
            });
          })
          .catch(err => {
            console.log('failed: ', err); // eslint-disable-line
          });
      }
  
      const productsPromise = Promise.all(urlProducts.map(getProductData));
      resolve(productsPromise)
    });
  });
};
