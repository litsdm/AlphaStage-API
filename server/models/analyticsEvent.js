var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnalyticsEventSchema = new Schema({
  name: { type: String },
  value: { type: Number }
});

module.exports = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
