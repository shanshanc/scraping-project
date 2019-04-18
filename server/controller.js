
exports.getProductFeed = async (ctx) => {
  try {
    ctx.body = 'Hello Controller';
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
};