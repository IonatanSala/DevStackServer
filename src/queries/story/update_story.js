const Story = require('../../models/story/story');
const User = require('../../models/user');

const updateStory = (currentUser, storyId, storyProps) => {
  return User.findOne({_id: currentUser._id})
    .populate({
      path: 'stories',
      match: {_id: storyId}
    })
    .then(user => {
      const story = user.stories[0];
      story[story.type].set(storyProps);
      return story.save()
    })
}

module.exports = updateStory;
