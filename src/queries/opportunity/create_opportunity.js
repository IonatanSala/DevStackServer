const Opportunity = require('../../models/opportunity');

const createOpportunity = (currentUser, opportunity) => {

  const newOpportunity = new Opportunity(opportunity);
  currentUser.opportunities.push(newOpportunity)

  return Promise.all([currentUser.save(), newOpportunity.save()])
    .then(results => results[1])
}

module.exports = createOpportunity;
