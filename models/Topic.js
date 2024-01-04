const mongoose = require('mongoose');
const { Schema } = mongoose;
var moment = require('moment');

const topicSchema = new Schema({
  author: String,
  title: String,
  content: {
    type: String,
    trim: true
  },
  created_at: {
    type: String,
    default: () => moment().format('lll')
  },
  pfp: String,
  cat: {
    type: String,
    default: 7
  }
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;