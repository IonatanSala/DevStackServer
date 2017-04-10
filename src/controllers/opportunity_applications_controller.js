const createOpportunityApplication = require('../queries/opportunity_application/createOpportunityApplication');

const create = (req, res, next) => {
  const currentUser = req.user;
  const { opportunityID } = req.body;

  createOpportunityApplication(currentUser, opportunityID)
    .then((data) => {
      res.json(data)
    })
    .catch(next);
}

module.exports = {
  create
};
