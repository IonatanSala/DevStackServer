const Opportunity = require('../../models/opportunity');
const User = require('../../models/user');

const getAllOpportunities = () => {
  return Opportunity.find({}, {'description': 0})
}

module.exports = getAllOpportunities;
