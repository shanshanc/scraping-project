const mongoose = require('./db');
const mongooseToCsv = require('mongoose-to-csv');

const productSchema = new mongoose.Schema({
  offerId: String,
  title: String,
  link: String,
  imageLink: String,
  description: String,
  price: {
    value: {type: String},
    currency: {type: String, default: 'USD'}
  },

  // availability: {type: String, default: 'in stock'},
  // brand: {type: String, default: 'Codeworks'},
  // age_group: {type: String, default: 'adult'},
  // color: {type: String, default: 'yellow'},
  // gender: {type: String, default: 'unisex'},
  // material: {type: String, default: 'cotton'},
  // pattern: {type: String, default: 'none'},
  // size: {type: String, default: 'M'}
});

productSchema.plugin(mongooseToCsv, {
  headers: 'offerId title link imageLink description',
  constraints: {
    'offerId': 'offerId',
    'title': 'title',
    'link': 'link',
    'imageLink': 'imageLink',
    'description': 'description'
  }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;