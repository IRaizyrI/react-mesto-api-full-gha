const router = require('express').Router();

router.get('/', (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: 'Logged out successfully' });
});

module.exports = router;
