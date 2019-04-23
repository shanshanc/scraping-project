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
  // size: {type: String, default: 'M'},
  
  // price: {
  //   value: {type: String},
  //   currency: {type: String, default: 'USD'}
  // },
  // material: {type: String, default: 'cotton'},
  // pattern: {type: String, default: 'none'},
});

productSchema.plugin(mongooseToCsv, {
  headers: 'id title link price image_link description availability brand age_group color gender',
  constraints: {
    'id': 'id',
    'title': 'title',
    'link': 'link',
    'price': 'price',
    'image_link': 'image_link',
    'description': 'description',
    'availability': 'availability',
    'brand': 'brand',
    'age_group': 'age_group',
    'color': 'color',
    'gender': 'gender'
  }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;