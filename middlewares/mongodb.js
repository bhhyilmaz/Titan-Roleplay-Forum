const mongoose = require('mongoose');

const connectToDatabase = () => {
  return new Promise(() => {
    mongoose.connect(process.env.DB_URL_123)
      .then(() => {
        console.log('MongoDB: ok');
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

module.exports = connectToDatabase;