var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PotentialUserSchema = new Schema({
  email: String,
  isDeveloper: Boolean
});

module.exports = mongoose.model('PotentialUser', PotentialUserSchema);
