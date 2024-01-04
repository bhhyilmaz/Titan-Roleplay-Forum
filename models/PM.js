const mongoose = require('mongoose');
const { Schema } = mongoose;
var moment = require('moment');

const PMSchema = new Schema({
  created_at: {
    type: String,
    default: () => moment().format('lll')
  },
  author: String,
  receiver: String,
  content: String
});

const PM = mongoose.model('PM', PMSchema);

module.exports = PM;