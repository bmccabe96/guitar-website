var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TypeSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
  }
);

//Virtual for URL
TypeSchema
.virtual('url')
.get(function () {
  return '/catalog/types' + this._id;
});

//export model
module.exports = mongoose.model('Type', TypeSchema);