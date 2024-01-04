const express = require("express");
const User = require('../../models/User');
const router = express.Router();

router.get('/user/:usernameParam', async (req, res) => {
  await User.find({ username: req.params.usernameParam })
    .then(user => {
      if (user[0]) {
        Username = user[0].username;
        date = user[0].created_at;
        Pfp = user[0].pfp;

        return res.json({
          Username,
          date,
          Pfp
        });
      };
    });
});

module.exports = router;