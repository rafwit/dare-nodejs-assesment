const router = require('express').Router();

router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
