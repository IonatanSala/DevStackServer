const passport = require('passport');
const router = require('express').Router()
const { create, show, update, getProfile, myAppliedPositions, updateAvatar } = require('../controllers/users_controller');
const multer  = require('multer');
const upload = multer();

router
  .post('/', create)
  .put('/', passport.authenticate('jwt', {session: false}), update)
  .post('/avatar', passport.authenticate('jwt', { session: false }), upload.single('file'), updateAvatar)
  .get('/getProfile', passport.authenticate('jwt', {session: false}), getProfile)
  .get('/details', passport.authenticate('jwt', {session: false}), show)
  .get('/my-applied-positions', passport.authenticate('jwt', {session: false}), myAppliedPositions)


;

module.exports = router;
