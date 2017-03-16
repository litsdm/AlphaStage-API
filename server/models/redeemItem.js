var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RedeemItemSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  item: Schema.ObjectId,
  key: String,
  takenBy: { type: Schema.ObjectId, ref: 'User', default: null },
  type: String
});

RedeemItemSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('RedeemItem', RedeemItemSchema);
