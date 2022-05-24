var Type = require('../models/guitar');
const { body, validationResult} = require('express-validator');
var async = require('async');

//Get list of all types
exports.guitar_list = function(req, res, next) {
  
  Type.find()
    .sort([['name', 'descending']])
    .populate('brand')
    .populate('type')
    .exec(function(err, list_guitars) {
      if(err) { return next(err); }
      //successful, so send JSON
      res.json(list_guitars);
    });
};