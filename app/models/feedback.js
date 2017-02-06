var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  good: String,
  better: String,
  best: String,
  gameplay: { type: Schema.Types.ObjectId, ref: 'Gameplay' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
