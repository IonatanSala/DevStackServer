const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunityApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const opportunityApplication = mongoose.model('opportunityApplication', opportunityApplicationSchema);

module.exports = opportunityApplication;
