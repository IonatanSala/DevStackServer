const passport = require('passport');
const router = require('express').Router()
const StoriesController = require('../controllers/stories_controller');

router
  .get('/', passport.authenticate('jwt', {session: false}), StoriesController.index)
  .post('/', passport.authenticate('jwt', {session: false}), StoriesController.create)
  .get('/:id', StoriesController.show)
  .put('/:id', passport.authenticate('jwt', {session: false}), StoriesController.update)
  .delete('/:id', passport.authenticate('jwt', {session: false}), StoriesController.remove)
;

module.exports = router;
