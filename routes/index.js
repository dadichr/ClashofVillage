const router = require('express').Router();
const userRoutes = require('./user')
const marketRoutes = require('./market');
const farmRoutes = require('./farm');
const barrackRoutes = require('./barrack');
const invadeRoutes = require('./invade');
const authentication = require('../middlewares/authentication')

const errorHandler = require('../middlewares/errorHandlers')

router.use('/users', userRoutes);
router.use(authentication);
router.use('/markets', marketRoutes);
router.use('/farms', farmRoutes);
router.use('/barracks', barrackRoutes);
router.use('/invades', invadeRoutes);

router.use(errorHandler);

module.exports = router;
