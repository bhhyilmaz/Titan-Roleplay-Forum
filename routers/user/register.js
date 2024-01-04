const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

router.post('/user/register',
  [
    check('username').not().isEmpty().isString().matches(/^[a-zA-Z[0-9]+$/, 'i').isLength({ min: 3, max: 20 }),
    check('email').not().isEmpty().isString().isEmail(),
    check('password').not().isEmpty().isString().isLength({ min: 6 }),
  ],
  (req, res) => {
    const { username, password, email } = req.body;
    // Validation
    const err = validationResult(req);
    const errArray = err.array();
    var existEmail = false;
    var existUsername = false;
    var wgEmail = false;
    var wgUsername = false;
    var wgPassword = false;

    for (let i = 0; i < errArray.length; i++) {
      var path = errArray[i].path
      if (path.includes("email")) {
        wgEmail = true;
      } else if (path.includes("username")) {
        wgUsername = true;
      } else if (path.includes("password")) {
        wgPassword = true;
      }
    };
    //

    try {
      User.find({ $or: [{ email: email }, { username: username }] })
        .then(db => {
          if (db.length > 0) {
            if (db[0].email === email) existEmail = true;
            if (db[0].username === username) existUsername = true;
          } else if (
            !wgEmail &&
            !wgUsername &&
            !wgPassword &&
            !existEmail &&
            !existUsername
          ) {
            User.create({
              email: email,
              username: username,
              password: password
            });
          };
          return res.json({
            existEmail,
            existUsername,
            wgEmail,
            wgUsername,
            wgPassword
          });
        });
    } catch (err) {
      console.log(err);
    };
  });

module.exports = router;