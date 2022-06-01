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

//Handle type create POST
exports.type_create_post = [
    
  //validate and sanitize
  body('name', 'name must not be empty').trim().isLength({ min: 1 }),
  body('description', 'description must not be empty').trim().isLength({ min: 1 }),


  //process request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body)
    //create new guitar object
    var type = new Type({
      name: req.body.name,
      description: req.body.description,
    });

    type.save(function(err) {
      if(err) { return next(err); }
      //successful, send new url to redirect to
      res.json(type);
    });
  }
];

//Handle type update POST
exports.type_update_post = [
  
  //validate and sanitize
  body('name', 'name must not be empty').trim().isLength({ min: 1 }),
  body('description', 'description must not be empty').trim().isLength({ min: 1 }),

  //process request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (errors) {
      console.log(errors);
    }
    //create new guitar object
    var type = new Type({
      name: req.body.name,
      description: req.body.description,
      _id: req.body.id
    });

    Type.findByIdAndUpdate(req.body.id, type, {}, function(err, thetype) {
      if(err) { return next(err); }
      res.send(thetype);
    })

  }
];


//Handle type Delete POST
exports.type_delete_post = function(req, res, next) {

  Type.findByIdAndRemove(req.body._id, function deleteType(err) {
    if(err) { return next(err); }
    //success go to type list
    res.send('/');
  });
}