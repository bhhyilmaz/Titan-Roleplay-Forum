const mongoose = require('mongoose');
const { Schema } = mongoose;
var moment = require('moment');

const commentSchema = new Schema({
  author: String,
  comment: String,
  created_at: {
    type: String,
    default: () => moment().format('lll')
  },
  pfp: String,
  topic_id: String,
  pfp: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;