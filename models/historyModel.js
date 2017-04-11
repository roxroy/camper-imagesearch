var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HistorySchema   = new Schema({
    term: String,
    when: { type: Date, default: Date.now}
});

module.exports = mongoose.model('HistoryModel', HistorySchema);
