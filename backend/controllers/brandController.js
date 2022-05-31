var Brand = require('../models/brand');
const { body, validationResult} = require('express-validator');
var async = require('async');

//Get list of all types
exports.brand_list = function(req, res, next) {
  
  Brand.find()
    .sort([['name', 'descending']])
    .exec(function(err, list_brands) {
      if(err) { return next(err); }
      //successful, so send JSON
      res.json(list_brands);
    });
};

//Handle brand create POST
exports.brand_create_post = [
    
  //validate and sanitize
  body('name', 'name must not be empty').trim().isLength({ min: 1 }),
  body('description', 'description must not be empty').trim().isLength({ min: 1 }),


  //process request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body)
    //create new guitar object
    var brand = new Brand({
      name: req.body.name,
      description: req.body.description,
    });

    brand.save(function(err) {
      if(err) { return next(err); }
      //successful, send new url to redirect to
      res.json(brand);
    });
  }
];

//Handle brand update POST
exports.brand_update_post = [
  
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
    var brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      _id: req.body.id
    });

    Brand.findByIdAndUpdate(req.body.id, brand, {}, function(err, thebrand) {
      if(err) { return next(err); }
      res.send(thebrand);
    })

  }
];


//Handle brand Delete POST
exports.brand_delete_post = function(req, res, next) {

  Brand.findByIdAndRemove(req.body._id, function deleteBrand(err) {
    if(err) { return next(err); }
    //success go to brand list
    res.send('/');
  });
}