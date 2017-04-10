const Opportunity = require('../../models/opportunity');
const User = require('../../models/user');

const getIsCreator = (currentUser, id) => {
  return User.findOne({_id: currentUser._id})
    .populate({
      path: 'opportunities',
      match: { _id: id }
    })
    .then(user => {
      const resObj = {
        isCreator: false
      };

      if(user.opportunities.length) {
        resObj.isCreator = true;
      }

      return resObj;
    });
}

module.exports = getIsCreator;
