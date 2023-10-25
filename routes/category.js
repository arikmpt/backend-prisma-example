const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/categoryController')

router.post('/create', controller.create);
router.get('/list', controller.list);

module.exports = router