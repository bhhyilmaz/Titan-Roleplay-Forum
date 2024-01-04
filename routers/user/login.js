const express = require("express");
const User = require('../../models/User');
const router = express.Router();

router.post('/user/login', async (req, res) => {
  req.setTimeout(50 * 100);
  const { username, password } = req.body;

  try {
    await User.find({ username: username, password: password })
      .then(user => {
        if (user.length > 0) {
          req.session.username = username;

          return res.json({ Login: true });
        } else {
          return res.json({ Login: false });
        }
      });
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;