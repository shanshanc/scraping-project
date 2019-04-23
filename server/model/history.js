const mongoose = require('../db');

let currentDate = new Date(Date.now()); 

const historySchema = new mongoose.Schema({
  number_of_items: Number,
  id: {type: Number, default: currentDate.setDate(currentDate.getDate() - 9)}
}, { collection: 'histories'});

const History = mongoose.model('Histories', historySchema);

module.exports = History;