const Opportunity = require('../../models/opportunity');
const User = require('../../models/user');

const updateOpportunity = (currentUser, opportunity, id) => {
  return User.findOne({ _id: currentUser._id})
    .populate({
      path: 'opportunities',
      match: { _id: id }
    })
    .then(user => {
      let subDoc = user.opportunities[0]
      subDoc.set(opportunity);

      return subDoc.save();
    });
}

module.exports = updateOpportunity;
