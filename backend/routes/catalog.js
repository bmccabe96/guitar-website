var express = require('express');
var router = express.Router();

//Require controller modules
var guitar_controller = require('../controllers/guitarController');
var brand_controller = require('../controllers/brandController');
var type_controller = require('../controllers/typeController');


/// GUITAR ROUTES ///

//Get request for all types
router.get('/guitars', guitar_controller.guitar_list);

//Create guitar GET request
router.get('/guitar/create', guitar_controller.guitar_create_get);

//Create guitar POST request
router.post('/guitar/create', guitar_controller.guitar_create_post);

//Delete guitar GET
router.get('/guitar/:id/delete', guitar_controller.guitar_delete_get);

//Delete guitar POST
router.post('/guitar/:id/delete', guitar_controller.guitar_delete_post);

//Get guitar detail
router.get('/guitar/:id', guitar_controller.guitar_detail);

//Update guitar GET
router.get('/guitar/:id/update', guitar_controller.guitar_update_get);

//Update guitar POST
router.post('/guitar/:id/update', guitar_controller.guitar_update_post);



/// TYPE ROUTES ///

//Get request for all types
router.get('/types', type_controller.type_list);


/// BRAND ROUTES ///

//Get request for all types
router.get('/brands', brand_controller.brand_list);

//Create brand POST
router.post('/brand/create', brand_controller.brand_create_post);

//Update brand POST
router.post('/brand/update', brand_controller.brand_update_post);

//Delete brand POST
router.post('/brand/delete', brand_controller.brand_delete_post);




module.exports = router;
