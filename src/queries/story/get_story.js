const Story = require('../../models/story/story');

const getStory = (_id) => {
  // needs fixing for getting story only for user that story belongs to.
  return Story.findOne({ _id})
}

module.exports = getStory;
