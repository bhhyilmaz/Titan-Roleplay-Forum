const express = require("express");
const router = express.Router();

router.post('/user/logout', (req) => {
  const logout = req.body;
  if (logout) req.session.destroy();
});

module.exports = router;