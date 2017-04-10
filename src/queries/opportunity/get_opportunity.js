const Opportunity = require('../../models/opportunity');

const getOpportunity = (_id) => {
  return Opportunity.findOne({ _id})
}

module.exports = getOpportunity;
