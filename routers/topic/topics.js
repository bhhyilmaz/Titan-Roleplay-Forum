const express = require("express");
const Topic = require('../../models/Topic');
const router = express.Router();

router.get("/topics", (req, res) => {
  var topic = Array;

  try {
    Topic.find().then(db => {
      topic = db;
      return res.status(200).json({ topic });
    });
  } catch (error) {
    console.log(error);
  };
});

module.exports = router;