var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnalyticsSchema = new Schema({
  daily: [{ type: Schema.Types.ObjectId, ref: 'AnalyticsEvent' }],
  weekly: [{ type: Schema.Types.ObjectId, ref: 'AnalyticsEvent' }],
  monthly: [{ type: Schema.Types.ObjectId, ref: 'AnalyticsEvent' }]
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
