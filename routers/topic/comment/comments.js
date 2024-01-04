const express = require("express");
const Comment = require("../../../models/Comment");
const router = express.Router();

router.post("/comments", (req, res) => {
  var comments = Array;
  var topicIdParam = req.body.topicIdParam;

  try {
    Comment.find({ topic_id: topicIdParam }).then(db => {
      comments = db;
      return res.status(200).json({ comments });
    });
  } catch (error) {
    console.log(error);
  };
});

module.exports = router;