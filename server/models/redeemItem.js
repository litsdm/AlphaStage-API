var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var RedeemItemSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  item: Schema.ObjectId,
  key: String,
  takenBy: { type: Schema.ObjectId, ref: 'User' },
  type: String
});

RedeemItemSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  this.key = shortid.generate()

  next();
});

module.exports = mongoose.model('RedeemItem', RedeemItemSchema);
