const S3Service = require('../../services/awsS3Service');

const saveAvatar = async (user, image, imageName) => {
  const s3 = new S3Service();
  s3.setBucket('devstack1');

  const avatarKey = `${user._id}-avatar-${imageName}`;
  try {
    await s3.saveFile({ACL: 'public-read', Key: avatarKey, Body: image});
  } catch(e) {
    console.log(e);
    return e;
  }

  user.avatar = avatarKey;
  await user.save();

  try {
    return s3.getFileUrl({Key: avatarKey});
  } catch(e) {
    console.log(e);
    return e;
  }
}

module.exports = saveAvatar;
