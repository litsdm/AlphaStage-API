var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
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
  releaseDate: Date
});

module.exports = mongoose.model('Game', GameSchema);
