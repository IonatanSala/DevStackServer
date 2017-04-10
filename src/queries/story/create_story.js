const Story = require('../../models/story/story');

const createStory = (currentUser, story) => {

  const newStory = new Story(story);
  currentUser.stories.push(newStory)

  return Promise.all([currentUser.save(), newStory.save()])
    .then(results => results[1])
}


module.exports = createStory;
