const User = require('../../models/user');

const getUserDetails = (currentUser) => {
  return User.findOne({_id: currentUser._id})
    .then((u) => {
      const user = {
        email: u.email,
        isEmployer: u.isEmployer
      };

      return user;
    });
}

module.exports = getUserDetails;
