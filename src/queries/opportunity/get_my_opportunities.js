const Opportunity = require('../../models/opportunity');
const User = require('../../models/user');

const getMyOpportunities = (currentUser) => {
  return User.findOne({_id: currentUser._id}).populate({path: 'opportunities', select: '-description'})
}

module.exports = getMyOpportunities;
