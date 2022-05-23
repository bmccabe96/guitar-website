var Type = require('../models/type');
const { body, validationResult} = require('express-validator');
var async = require('async');

//Get list of all types
exports.type_list = function(req, res, next) {
  
  Type.find()
    .sort([['name', 'descending']])
    .exec(function(err, list_types) {
      if(err) { return next(err); }
      //successful, so send JSON
      res.json(list_types);
    });
};