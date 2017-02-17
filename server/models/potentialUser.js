var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PotentialUserSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  email: String,
  isDeveloper: Boolean
});

PotentialUserSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('PotentialUser', PotentialUserSchema);
