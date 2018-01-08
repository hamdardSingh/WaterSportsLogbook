var express = require('express');
var adminController = require('../app/controllers/adminController');
var router = express.Router();

/* GET users listing. */
router.post('/login', adminController.login);
router.post('/logout', adminController.logOut);
router.get('/dummy',adminController.createDummy);
module.exports = router;
