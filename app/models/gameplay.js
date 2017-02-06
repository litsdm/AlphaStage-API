var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameplaySchema = new Schema({
  s3URL: String,
  cloudfrontURL: String,
  createdAt: { type: Date, default: Date.now() },
  key: String
});

module.exports = mongoose.model('Gameplay', GameplaySchema);
