const Story = require('../../models/story/story');
const User = require('../../models/user');

const getAllStories = (currentUser) => {
  return Story.find({_id: { $in: currentUser.stories } })
}

module.exports = getAllStories;
