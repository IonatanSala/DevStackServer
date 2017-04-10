const { tokenForUser } = require('../helpers/auth');

// authenticate the user, give him a token
function create(req, res, next) {
  res.send({ email: req.user.email, isEmployer: req.user.isEmployer, token: tokenForUser(req.user)})
}

const authController = {
  create,
};

module.exports = authController;
