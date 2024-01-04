const mongoose = require('mongoose');
const { Schema } = mongoose;
var moment = require('moment');

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  created_at: {
    type: String,
    default: () => moment().format('L')
  },
  pfp: {
    type: String,
    default: 'http://localhost:3000/img/default.webp'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;