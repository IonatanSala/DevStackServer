const User = require('../../models/user');

const updateUser = (currentUser, userData) => {
  let profileToUpdate = 'profile.user';
  if(currentUser.isEmployer) {
    profileToUpdate = 'profile.employer'
  }

  return User.findOneAndUpdate({_id: currentUser}, { 'profile.user': userData })
}

module.exports = updateUser;
