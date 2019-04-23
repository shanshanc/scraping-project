const Product = require('../model/product');
const History = require('../model/history');
const { fetchProducts } = require('../fetchdata');
const fs = require('fs');

exports.getProductFeed = async (ctx) => {
  try {
    ctx.response.body = await Product.find({})
      .select('-_id -__v')
      .where('id').ne(null); // find productId not null
    ctx.status = 200;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};

exports.scrapSite = async (ctx) => {
  try {
    // call the crawler function
    const fetch = fetchProducts();
    const products = await fetch;

    // add a new record to history
    const rowNum = products.length;
    await History.create({number_of_items: rowNum}, function (err) {
      if (err) console.log(err); // eslint-disable-line
    }); 
    console.log('Added a new record to the history collection'); // eslint-disable-line

    // clear and add fetched products to collection
    await Product.deleteMany({}, function (err) {
      if (err) console.log(err); // eslint-disable-line
    });

    await Product.insertMany(products, function (err) {
      if (err) console.log(err); // eslint-disable-line
    }); 
    console.log('Added products to product collection'); // eslint-disable-line

    // send the fetched product data to ctx.body
    ctx.response.body = products;
    ctx.status = 200;

  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 400;
  }
}

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

exports.generateTxt = async (ctx) => {
  try { 
    Product.find({})
                .stream()
                // .pipe(JSONStream.stringify())
                .pipe(fs.createWriteStream('./output/feed_from_file.txt', {encoding: 'utf-8'}));
    ctx.status = 200;
 } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
 }
};

