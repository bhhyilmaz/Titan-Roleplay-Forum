const express = require("express");
const User = require('../../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/user/edit',
  [
    check('email').not().isEmpty().isString().isEmail(),
    check('password').not().isEmpty().isString().isLength({ min: 6 }),
    check('pfp').not().isEmpty().isString(),
    // Only emptry checking
    check('password', 'empty password').not().isEmpty(),
    check('pfp', 'empty pfp').not().isEmpty(),
    check('email', 'empty email').not().isEmpty()
  ], async (req, res) => {

    var user = req.session.username;
    var { email, password, pfp } = req.body;

    // The validation of the form
    const err = validationResult(req);
    const errArray = err.array();
    var existEmail = false;
    var wgEmail = false;
    var wgPassword = false;
    var wgPfp = false;
    var emptyEmail = false;
    var emptyPassword = false;
    var emptyPfp = false;

    // For the error "path:"
    for (let i = 0; i < errArray.length; i++) {
      var path = errArray[i].path
      if (path.includes("email")) {
        wgEmail = true;
      } else if (path.includes("password")) {
        wgPassword = true;
      } else if (path.includes("pfp")) {
        wgPfp = true;
      };
    };

    // For the error "msg:"
    for (let i = 0; i < errArray.length; i++) {
      var msg = errArray[i].msg
      if (msg.includes("empty email")) {
        emptyEmail = true;
      } else if (msg.includes("empty password")) {
        emptyPassword = true;
      } else if (msg.includes("empty pfp")) {
        emptyPfp = true;
      };
    };

    try {
      // Exist info check
      await User.find({ email: email })
        .then(async db => {
          if (db.length > 0) {
            if (db[0].email === email) existEmail = true;
          }
        });

      // Change profile infos
      if (!existEmail && !wgEmail) {
        await User.updateOne(
          { username: user }, { $set: { email: email } }
        );
      };
      if (!wgPfp) {
        await User.updateOne(
          { username: user }, { $set: { pfp: pfp } }
        )
      };
      if (!wgPassword) {
        await User.updateOne(
          { username: user }, { $set: { password: password } }
        );
      };

      // Return objects for the client-side form CSS
      return res.json({
        existEmail,
        wgEmail,
        wgPassword,
        wgPfp,
        emptyEmail,
        emptyPassword,
        emptyPfp
      });
    } catch (err) {
      console.log(err);
    };
  });

module.exports = router;