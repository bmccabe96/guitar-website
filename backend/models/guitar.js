var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuitarSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true, maxlength: 750},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    type: [{type: Schema.Types.ObjectId, ref: 'Type'}],
    price: {type: Number, min: 0},
    image: {type: String, required: true},
  }
);

//Virtual for URL
GuitarSchema
.virtual('url')
.get(function () {
  return '/catalog/guitar' + this._id;
});


//export model
module.exports = mongoose.model('Guitar', GuitarSchema);