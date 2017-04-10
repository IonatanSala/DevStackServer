const OpportunityApplication = require('../../models/opportunityApplication');
const Opportunity = require('../../models/opportunity');

const createOpportunityApplication = (currentUser, opportunityID) => {
  const newOpportunityApplication = new OpportunityApplication();
  newOpportunityApplication.user = currentUser;

  return Opportunity.findOne({ _id: opportunityID})
    .then((opportunity) => {
      opportunity.applications.push(newOpportunityApplication);

      return Promise.all([newOpportunityApplication.save(), opportunity.save()])
    })
    .then((results) => {
      return results[0]._id
    });

}

module.exports = createOpportunityApplication;
