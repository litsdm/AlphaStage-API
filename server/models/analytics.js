var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnalyticsSchema = new Schema({
  players: { type: Number, default: 0 },
  sessions: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  pageViewUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downloadUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  playingUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  uninstallUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
