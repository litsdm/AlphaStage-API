var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameplaySchema = new Schema({
  s3URL: String,
  gameId: Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now() },
  key: String
});

module.exports = mongoose.model('Gameplay', GameplaySchema);
