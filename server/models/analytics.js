var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnalyticsSchema = new Schema({
  players: { type: Number, default: 0 },
  sessions: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
