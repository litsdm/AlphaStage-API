var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  description: String,
  img: String
});

module.exports = mongoose.model('Game', GameSchema);
