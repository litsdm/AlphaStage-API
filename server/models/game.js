var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  name: String,
  description: String,
  img: String,
  backgroundImg: String,
  galleryLinks: [String],
  videoLinks: [String],
  playCount: { type: Number, default: 0 },
  availableOn: {
    windows: Boolean,
    macOS: Boolean,
    linux: Boolean
  },
  releaseDate: Date,
  feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  developer: { type: Schema.Types.ObjectId, ref: 'User' }
});

GameSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('Game', GameSchema);
