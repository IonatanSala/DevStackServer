const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  url: String,
  skillsInvolved: [String],
  description: String
}, { _id: false });

module.exports = ProjectSchema;
