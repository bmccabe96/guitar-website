var Guitar = require('../models/guitar');
var Type = require('../models/type');
var Brand = require('../models/brand');
const { body, validationResult} = require('express-validator');
var async = require('async');

//Get list of all types
exports.guitar_list = function(req, res, next) {
  
  Guitar.find()
    .sort([['name', 'descending']])
    .populate('brand')
    .populate('type')
    .exec(function(err, list_guitars) {
      if(err) { return next(err); }
      //successful, so send JSON
      res.json(list_guitars);
    });
};

//Handle guitar create GET
exports.guitar_create_get = function(req, res, next) {

  //Get all brands and types
  async.parallel({
    brands: function(callback) {
      Brand.find(callback);
    },
    types: function(callback) {
      Type.find(callback);
    }
  }, function (err, results) {
    if(err) {return next(err); }
    res.json(results);
  });
};


//Handle guitar create POST
exports.guitar_create_post = [
  //convert types to an array
  (req, res, next) => {
    if(!(req.body.type instanceof Array)) {
      if(typeof req.body.type === 'undefined'){
        req.body.type = []
      }
      else {
        req.body.type = new Array(req.body.type);
      }
    }
    console.log(1);
    next();
  },
  

  //validate and sanitize
  body('name', 'name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'description must not be empty').trim().isLength({ min: 1 }).escape(),
  body('brand', 'brand must not be empty').trim().isLength({ min: 1 }).escape(),
  body('type.*').escape(),
  body('price', 'price must not be empty').trim().isLength({ min: 1 }).escape(),

  //process request
  (req, res, next) => {
    console.log(2)
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body)
    //create new guitar object
    var guitar = new Guitar({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
    });
    console.log(3)

    guitar.save(function(err) {
      console.log(6,err)
      if(err) { return next(err); }
      console.log(7)
      //successful, send new url to redirect to
      res.json(guitar.url);
      console.log(8)
    });
  }
    // if (!errors.isEmpty()) {
    //   console.log(errors);
    //   // There are errors. Render form again with sanitized values/error messages.
    //   async.parallel({
    //     brands: function(callback) {
    //       Brand.find(callback);
    //     },
    //     types: function(callback) {
    //       Type.find(callback);
    //     }
    //   }, function(err, results) {
    //     if(err) { return next(err); }
    //     res.json(results);
    //   });
    //   console.log(4)
    //   return;
    // }
    // else {
    //   console.log(5)
    //   //data is okay, save
    //   guitar.save(function(err) {
    //     console.log(6,err)
    //     if(err) { return next(err); }
    //     console.log(7)
    //     //successful, send new url to redirect to
    //     res.json(guitar.url);
    //     console.log(8)
    //   });
    // }
    
  
];

