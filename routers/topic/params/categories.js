const express = require("express");
const Topic = require('../../../models/Topic');
const router = express.Router();

router.get("/cat/:catParam", async (req, res) => {
  var catParam = req.params.catParam;
  var noCat = false;

  const cat = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  try {
    // Prevent non exist categories with this object
    if (!cat.includes(catParam)) noCat = true;

    const db = await Topic.find({ cat: catParam });

    return res.status(200).json({ db, noCat });

  } catch (error) {
    console.log(error);
  };
});

module.exports = router;