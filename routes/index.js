const express = require('express'),
    router = express.Router(),
    authRouter = require('./auth'),
    categoryRouter = require('./category'),
    productRouter = require('./product');

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);

module.exports = router