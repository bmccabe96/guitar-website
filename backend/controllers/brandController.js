var Type = require('../models/brand');
const { body, validationResult} = require('express-validator');
var async = require('async');

//Get list of all types
exports.brand_list = function(req, res, next) {
  
  Type.find()
    .sort([['name', 'descending']])
    .exec(function(err, list_brands) {
      if(err) { return next(err); }
      //successful, so send JSON
      res.json(list_brands);
    });
};