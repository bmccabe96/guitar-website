var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true, maxlength: 750},
  }
);

//Virtual for URL
BrandSchema
.virtual('url')
.get(function () {
  return '/catalog/brand' + this._id;
});

//export model
module.exports = mongoose.model('Brand', BrandSchema);
