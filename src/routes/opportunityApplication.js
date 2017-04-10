const passport = require('passport');
const router = require('express').Router();
const OpportunityApplicationController = require('../controllers/opportunity_applications_controller');

router.
  post('/', passport.authenticate('jwt', {session: false}), OpportunityApplicationController.create)

module.exports = router;
