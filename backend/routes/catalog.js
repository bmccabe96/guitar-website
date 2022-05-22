var express = require('express');
var router = express.Router();

//Require controller modules
var guitar_controller = require('../controllers/guitarController');
var brand_controller = require('../controllers/brandController');
var type_controller = require('../controllers/typeController');