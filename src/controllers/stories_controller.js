const Story = require('../models/story/story');
const getAllStories = require('../queries/story/get_all_stories');
const getStory = require('../queries/story/get_story');
const createStory = require('../queries/story/create_story');
const removeStory = require('../queries/story/remove_story');
const updateStory = require('../queries/story/update_story');



// /stories/ => return all users stories
const index = (req, res, next) => {
  getAllStories(req.user)
    .then((stories) => res.json(stories))
    .catch(next);
}

// /stories/:id => return individual story
const show = (req, res, next) => {
  const { id } = req.params
  getStory(id)
    .then(story => {
      if(story === null) return res.status(404).send({error: 'Record not found'});
      res.json(story);
    })
    .catch(next)
}

// /stories => create a story
const create = (req, res, next) => {
  let currentUser = req.user;
  let story = req.body;

  createStory(currentUser, story)
    .then(createdStory => {
      return res.status(201).json(createdStory);
    })
    .catch(next)
}

// /stories/:id => remove a story
const remove = (req, res, next) => {
  // only the owner can remove
  if(req.user.stories.indexOf(req.params.id) === -1) res.status(403).send();
  const currentUser = req.user;
  const storyId = req.params.id;
  removeStory(currentUser, storyId)
    .then(() => {
      res.status(204).send()
    })
    .catch(next);
}

// /stories/:id => update a story
const update = (req, res, next) => {
  const currentUser = req.user;
  const storyProps = req.body;
  const storyId = req.params.id;

  updateStory(currentUser, storyId, storyProps)
    .then((story) => res.json(story))
    .catch(next)
}

module.exports = {
  index,
  show,
  create,
  remove,
  update
};
