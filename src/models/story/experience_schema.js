const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ExperienceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  description: String,
  skillsInvolved: [String]
}, { _id: false });

module.exports = ExperienceSchema;
