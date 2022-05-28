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

//Display a detail page for a specific guitar
exports.guitar_detail = function(req, res, next) {

  Guitar.findById(req.params.id)
  .populate('brand')
  .populate('type')
  .exec(function(err, theguitar) {
    if(err) { return next(err); }
    if(theguitar == null) {
      var err = new Error("Guitar cannot be empty");
      err.status=404;
      return next(err);
    }
    //successful, so return response
    res.json(theguitar);
  })
}

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
];


//Handle guitar Delete GET
exports.guitar_delete_get = function(req, res, next) {

  Guitar.findById(req.params.id)
  .exec(function (err, theguitar) {
    if(err) { return next(err); }
    if(theguitar == null) {
      console.log("DID NOT FIND, DO SOMETHING...")
    }
    //successful
    res.json(theguitar);
  });
}


//Handle guitar Delete POST

