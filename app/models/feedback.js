var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  good: String,
  better: String,
  best: String,
  gameplay: { type: Schema.Types.ObjectId, ref: 'Gameplay' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
