const User = require('../../models/user');
const OpportunityApplication = require('../../models/opportunityApplication');
const Opportunity = require('../../models/opportunity');

const getMyAppliedPositions = async (currentUser) => {
  const applications = await OpportunityApplication.find({user: currentUser});
  const opportunities = await Opportunity.find({
    applications: {
      $in: applications
    }
  }, { description: 0})
  .populate('applications');
  return opportunities;
}

module.exports = getMyAppliedPositions;
