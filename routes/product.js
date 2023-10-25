const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/productController'),
    multer = require('../middlewares/multer')

router.post('/create', multer.image.single('image') , controller.create);

module.exports = router