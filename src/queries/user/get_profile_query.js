const S3Service = require('../../services/awsS3Service');
const User = require('../../models/user');

const getProfileQuery = (currentUser) => {
  return User.findOne({ _id: currentUser._id })
    .then(async user => {

      let profile = (user.isEmployer) ? user.profile.employer : user.profile.user;
      profile = profile.toObject();

      if(!!user.avatar) {
        const s3 = new S3Service();
        s3.setBucket('devstack1');
        profile.avatar = await s3.getFileUrl({Key: user.avatar})
      }

      return profile;
    })
}

module.exports = getProfileQuery;
