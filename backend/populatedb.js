console.log('This script populates some test guitars, types, brands for database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Guitar = require('./models/guitar')
var Type = require('./models/type')
var Brand = require('./models/brand')


var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://user:user@cluster0.afdcs.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var guitars = []
var types = []
var brands = []

function guitarCreate(name, description, brand, type, price, image, cb) {
  
  var guitar = new Guitar({
    name: name,
    description: description,
    brand: brand,
    type: type,
    price: price,
    image: image
  });
       
  guitar.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Guitar: ' + guitar);
    guitars.push(guitar)
    cb(null, guitar)
  }  );
}

function typeCreate(name, cb) {
  var type = new Type({ name: name });
       
  type.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Type: ' + type);
    types.push(type)
    cb(null, type);
  }   );
}

function brandCreate(name, description, cb) {
  var brandDetail = { 
    name: name,
    description: description
  }
    
  var brand = new Brand(brandDetail);    
  brand.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand)
  }  );
}



function createTypesAndBrands(cb) {
    async.series([
        function(callback) {
          typeCreate('Acoustic', callback);
        },
        function(callback) {
          typeCreate('Electric', callback);
        },
        function(callback) {
          typeCreate('12 String', callback);
        },
        function(callback) {
          typeCreate('Semi Hollow', callback);
        },
        function(callback) {
          brandCreate("Fender", "Since 1946, Fender's iconic Stratocasters, Telecasters and Precision & Jazz bass guitars have transformed nearly every music genre.", callback);
        },
        function(callback) {
          brandCreate("Yamaha", "Everything we do is about inspiring guitarists to create something amazing. Your music does not stand still, so why would we?", callback);
        },
        ],
        // optional callback
        cb);
}


function createGuitars(cb) {
    async.parallel([
        function(callback) {
          guitarCreate("Yamaha F335 Acoustic", "Yamaha's F335 gives you that classic dreadnought shape and sound at a price that won't break your bank. The F335's tonewood combination includes a laminate spruce top, rosewood fingerboard and bridge, and meranti back and sides. Gold die-cast tuners provide smooth and accurate tuning while a tortoise-pattern pickguard gives a bit more style.", brands[1], [types[0],], 169.99, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQihw4yXpMusBdLlkibEySBo9hP0DjGr-Uq8RfYM7mfMEBNgOMwW-kykus5cvzgK9xlY0&usqp=CAU", callback);
        },
        function(callback) {
          guitarCreate("Yamaha F335 Acoustic", "Yamaha's F335 gives you that classic dreadnought shape and sound at a price that won't break your bank. The F335's tonewood combination includes a laminate spruce top, rosewood fingerboard and bridge, and meranti back and sides. Gold die-cast tuners provide smooth and accurate tuning while a tortoise-pattern pickguard gives a bit more style.", brands[0], [types[1],], 849.99, "https://media.guitarcenter.com/is/image/MMGS7/L59796000001000-00-720x720.jpg", callback);
        },
        ],
        // optional callback
        cb);
}



async.series([
    createTypesAndBrands,
    createGuitars,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
   
    // All done, disconnect from database
    mongoose.connection.close();
});