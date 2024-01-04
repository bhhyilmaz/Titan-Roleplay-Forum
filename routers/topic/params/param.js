const express = require("express");
const Topic = require('../../../models/Topic');
const User = require('../../../models/User');
const router = express.Router();

router.get("/topic/:topicIdParam", async (req, res) => {

  try {
    await Topic.find({ _id: req.params.topicIdParam }).then(async db => {
      if (db) {
        Author = db[0].author;
        Title = db[0].title;
        Content = db[0].content;
        date = db[0].created_at;
        id = db[0]._id;

        // Finding user pfp with Author
        const user = await User.find({ username: Author });
        var pfp = user[0].pfp;

        return res.status(200).json({
          Author,
          Title,
          Content,
          date,
          pfp,
          id
        });
      };
    });
  } catch (error) {
    console.timeStamp
  }
});

module.exports = router;