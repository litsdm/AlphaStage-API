var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  good: String,
  better: String,
  best: String,
  gameplay: { type: Schema.Types.ObjectId, ref: 'Gameplay' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  mark: { type: Number, default: 0 }
});

FeedbackSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
