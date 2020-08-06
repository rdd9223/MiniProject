const router = require('express').Router();

router.use('/account', require('./account'));
router.use('/file', require('./file'));

module.exports = router;