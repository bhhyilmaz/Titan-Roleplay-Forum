const express = require("express");
const router = express.Router();
const User = require('../../models/User');

router.get("/users", async (req, res) => {
  var username = req.session.username;
  var Username = String;

  if (req.session.username !== undefined) var Session = true; // Projecting client-side items with this value

  if (username) {
    await User.find({ username: username })
      .then(user => {
        Username = user[0].username;
        Email = user[0].email;
        date = user[0].created_at;
        Pfp = user[0].pfp;

        return res.json({
          Username,
          date,
          Pfp,
          Email,
          Session
        });
      });
  };
});

module.exports = router;