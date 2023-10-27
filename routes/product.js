const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/productController'),
    multer = require('../middlewares/multer'),
    multerLib = require('multer')();

router.post('/create', multer.image.single('image') , controller.create);
router.post('/create-with-imagekit', multerLib.single('image') , controller.createWithImageKit);
router.post('/upload', multerLib.single('image'), controller.upload);

module.exports = router