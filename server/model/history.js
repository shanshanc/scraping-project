const mongoose = require('../db');

const historySchema = new mongoose.Schema({
  number_of_items: Number,
  record: {type: Number, default: Date.now()}
}, { collection: 'histories'});

const History = mongoose.model('Histories', historySchema);

module.exports = History;