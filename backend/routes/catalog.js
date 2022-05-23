var express = require('express');
var router = express.Router();

//Require controller modules
var guitar_controller = require('../controllers/guitarController');
var brand_controller = require('../controllers/brandController');
var type_controller = require('../controllers/typeController');


/// GUITAR ROUTES ///

//Get request for all types
router.get('/guitars', guitar_controller.guitar_list);

/// TYPE ROUTES ///

//Get request for all types
router.get('/types', type_controller.type_list);


/// BRAND ROUTES ///

//Get request for all types
router.get('/brands', brand_controller.brand_list);






module.exports = router;
