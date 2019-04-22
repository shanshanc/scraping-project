const mongoose = require('../db');
const mongooseToCsv = require('mongoose-to-csv');

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  link: String,
  price: String,
  image_link: String,
  description: String,
  
  availability: {type: String, default: 'in stock'},
  brand: {type: String, default: 'Codeworks'},
  age_group: {type: String, default: 'adult'},
  color: {type: String, default: 'yellow'},
  gender: {type: String, default: 'unisex'},
  size: {type: String, default: 'M'}
  
  // price: {
  //   value: {type: String},
  //   currency: {type: String, default: 'USD'}
  // },
  // material: {type: String, default: 'cotton'},
  // pattern: {type: String, default: 'none'},
});

productSchema.plugin(mongooseToCsv, {
  headers: 'offerId title link imageLink description',
  constraints: {
    'id': 'productId',
    'title': 'title',
    'link': 'link',
    'image_link': 'image_link',
    'description': 'description'
  }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;