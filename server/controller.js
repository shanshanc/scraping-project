const Product = require('./model');

exports.getProductFeed = async (ctx) => {
  try {
    ctx.body = 'Hello Controller';
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