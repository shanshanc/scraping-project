const mongoose = require('./db');

const productSchema = new mongoose.Schema({
  sku: String,
  name: String,
  link: String,
  image_link: String,
  price: String,
  description: String,

  availability: {type: String, default: 'in stock'},
  brand: {type: String, default: 'Codeworks'},
  age_group: {type: String, default: 'adult'},
  color: {type: String, default: 'yellow'},
  gender: {type: String, default: 'unisex'},
  material: {type: String, default: 'cotton'},
  pattern: {type: String, default: 'none'},
  size: {type: String, default: 'M'}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;