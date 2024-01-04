const express = require("express");
const { check, validationResult } = require('express-validator');
const Topic = require('../../models/Topic');
const router = express.Router();

router.post('/topic/new',
  [
    check('title').not().isEmpty().isString().isLength({ min: 3, max: 72 }),
    check('content').not().isEmpty().isString().isLength({ min: 3 }),
  ], (req, res) => {
    const { cat, title, content } = req.body;
    const username = req.session.username;

    // Validation
    const err = validationResult(req);
    const errArray = err.array();
    var wgTitle = false;
    var wgContent = false;

    for (let i = 0; i < errArray.length; i++) {
      var arrayPath = errArray[i].path
      if (arrayPath.includes("title")) {
        wgTitle = true;
      } else if (arrayPath.includes("content")) {
        wgContent = true;
      };
    };
    //

    if (!errArray.length > 0) {
      try {
        Topic.create({
          author: username,
          title: title,
          content: content,
          cat: cat
        });
      } catch (error) {
        console.log(error);
      };
    };

    return res.status(200).json({
      wgTitle,
      wgContent,
    });
  });

module.exports = router;