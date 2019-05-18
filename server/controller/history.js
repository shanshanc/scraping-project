const History = require('../model/history');

exports.postOneRecord = async (ctx) => {
  try {
    const newRecord = await History.create(ctx.request.body);
    ctx.body = newRecord;
    ctx.status = 200;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};

exports.getAllRecords = async (ctx) => {
  try {
    ctx.body = await History.find({})
      .sort({id: 'asc'});
    ctx.status = 200;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
}