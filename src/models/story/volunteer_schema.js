const mongoose = require('mongoose');
const Schema = mongoose.Schema

const VolunteerSchema = new Schema({
  organization: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  cause: {
    type: String,
    enum: [
      "animalRights",
      "artsAndCulture",
      "children",
      "civilRights",
      "humanitarianRelief",
      "economicEmpowerment",
      "education",
      "environment",
      "health",
      "humanRights",
      "politics",
      "povertyAlleviation",
      "scienceAndTechnology",
      "socialServices"
    ]
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    default: null
  },
  stillThere: {
    type: Boolean,
    default: false
  },
  description: String
}, { _id: false });

VolunteerSchema.path('to').validate(function(value, callback) {
  (!this.stillThere && value === null) ? callback(false) : callback(true);
}, "You must provide an end date");

module.exports = VolunteerSchema;
