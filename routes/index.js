const router = require('express').Router();

router.use('/', require('./swagger'));

//#Swagger.tags=['contacts']
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/contacts', require('./contacts'));

module.exports = router;