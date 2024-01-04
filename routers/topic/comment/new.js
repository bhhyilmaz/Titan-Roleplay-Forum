const express = require("express");
const { check, validationResult } = require('express-validator');
const Comment = require('../../../models/Comment');
const User = require('../../../models/User');
const router = express.Router();

router.post('/topic/comment/new',
  [
    check('comment').not().isEmpty().isString().isLength({ min: 3 })
  ], (req, res) => {
    const { comment, topicParam } = req.body;
    const username = req.session.username;

    // Validation
    const err = validationResult(req);
    const errArray = err.array();
    var wgComment = false;

    for (let i = 0; i < errArray.length; i++) {
      var arrayPath = errArray[i].path
      if (arrayPath.includes("comment")) {
        wgComment = true;
      }
    };
    //

    if (!errArray.length > 0 && username) {
      try {
        // Find pfp of the author
        User.find({ username: username })
          .then(db => {
            Pfp = db[0].pfp;
          });

        //Create comment
        Comment.create({
          pfp: Pfp,
          author: username,
          comment: comment,
          topic_id: topicParam
        });

      } catch (error) {
        console.log(error);
      };
    };

    return res.status(200).json({ wgComment });
  });

module.exports = router;