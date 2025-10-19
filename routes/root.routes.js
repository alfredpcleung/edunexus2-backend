const router = require('express').Router();

// GET /
router.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

module.exports = router;
