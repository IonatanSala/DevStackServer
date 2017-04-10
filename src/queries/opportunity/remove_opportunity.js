const Opportunity = require('../../models/opportunity');
const User = require('../../models/user');

const removeOpportunity = (currentUser, id) => {
  return User.findOne({_id: currentUser._id})
    .populate({
      path: 'opportunities',
      match: { _id: id }
    })
    .then(user => {
      const opportunity = user.opportunities[0];
      return opportunity.remove()
    });
}

module.exports = removeOpportunity;
