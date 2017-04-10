const User = require('./user');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: [
      'Full-time',
      'Part-time',
      'Temporary',
      'Contract',
      'Internship',
      'Commission',
      'Permanent',
      'Apprenticeship'
    ]
  },
  skills: [{
    type: String
  }],
  salary: {
    type: Number
  },
  salaryPaidPer: {
    type: String,
    enum: [
      'hour',
      'day',
      'month',
      'year'
    ]
  },
  description: {
    type: String,
    required: true,
    minlength: 30
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'opportunityApplication'
  }]
});

opportunitySchema.pre('remove', function(next) {
  const User = mongoose.model('user');
  User.findOne({opportunities: this._id})
    .then((user) => {
      user.opportunities.pull(this._id)
      return user.save()
    })
    .then(() => next());
});


const Opportunity = mongoose.model('opportunity', opportunitySchema);

module.exports = Opportunity;
