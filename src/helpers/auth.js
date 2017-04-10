const jwt = require('jwt-simple');
const { SECRET_TOKEN } = require('../config');

// generate token for user to make authenticated request
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, SECRET_TOKEN);
}

const authHelper = {
  tokenForUser,
}

module.exports = authHelper;
