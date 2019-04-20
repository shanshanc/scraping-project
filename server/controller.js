const { Product } = require('./model');
const { fetchProducts } = require('./fetchdata');
const fs = require('fs');

exports.getProductFeed = async (ctx) => {
  try {
    ctx.response.body = await Product.find({});
    ctx.status = 200;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};

exports.scrapSite = async (ctx) => {
  try {
    const fetch = fetchProducts();
    const products = await fetch;
    console.log(products.length, Date.now());
    ctx.response.body = products;
    ctx.status = 200;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 400;
  }
}

exports.generateCsv = async (ctx) => {
  try { 
    Product.find({})
                .stream()
                .pipe(Product.csvTransformStream())
                .pipe(fs.createWriteStream('./output/proudctFeed.csv', {encoding: 'utf-8'}));
    // const ws = fs.createWriteStream('./output/proudctFeed.csv', {encoding: 'utf-8'});
    // ws.on('error', (e) => console.log(e)); // eslint-disable-line
    // ws.write(content);
    ctx.status = 200;
 } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
 }
};

exports.createOneProduct = async (ctx) => {
  try {
    const result = await Product.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 201;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};