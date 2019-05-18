const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true }, err => {
  if (err) throw new Error(err);
  else console.log('Database connected'); //eslint-disable-line
});

module.exports = mongoose;