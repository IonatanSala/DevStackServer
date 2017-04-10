const Story = require('../../models/story/story');
const User = require('../../models/user');

const removeStory = (currentUser, _id) => {
  return User.findOne({ _id: currentUser._id })
    .populate({
      path: 'stories',
      match: {_id}
    })
    .then(user => {
      const story = user.stories[0];
      return story.remove()
    })
}

module.exports = removeStory;
