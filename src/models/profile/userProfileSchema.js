const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  headline: {
    type: String
  },
  summary: {
    type: String
  }
});

module.exports = userProfileSchema;
