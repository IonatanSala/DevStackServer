const router = require('express').Router();
const { create } = require('../controllers/auth_controller');
const passport = require('passport');

router
  .post('/', passport.authenticate('local', {session: false}), create)
;

module.exports = router;
