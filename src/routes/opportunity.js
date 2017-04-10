const passport = require('passport');
const router = require('express').Router()
const OpportunitiesController = require('../controllers/opportunity_controller');

router
  .get('/', OpportunitiesController.index)
  .get('/myOpportunities', passport.authenticate('jwt', {session: false}), OpportunitiesController.myOpportunities)
  .get('/isCreator/:id', passport.authenticate('jwt', {session: false}), OpportunitiesController.isCreator)
  .post('/', passport.authenticate('jwt', {session: false}), OpportunitiesController.create)
  .get('/:id', OpportunitiesController.show)
  .put('/:id', passport.authenticate('jwt', {session: false}), OpportunitiesController.update)
  .delete('/:id', passport.authenticate('jwt', {session: false}), OpportunitiesController.remove)
;

module.exports = router;
