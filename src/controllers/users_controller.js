const createUser = require('../queries/user/create_user');
const getUserDetails = require('../queries/user/getUserDetails');
const updateUser = require('../queries/user/update_user');
const getProfileQuery = require('../queries/user/get_profile_query');
const getMyAppliedPositions = require('../queries/user/get_my_applied_positions');
const saveAvatar = require('../queries/user/save_avatar');

// /users => creates a new user
function create(req, res, next) {
  const { email, password, isEmployer } = req.body;

  createUser(email, password, isEmployer)
    .then((results) => {
      res.json(results.data);
    })
    .catch(next);
}

function show(req, res, next) {
  const currentUser = req.user;

  getUserDetails(currentUser)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  const currentUser = req.user;
  const userData = req.body;

  updateUser(currentUser, userData)
    .then(data => res.json(data))
    .catch(next);

}

function getProfile(req, res, next) {
  const currentUser = req.user;
  getProfileQuery(currentUser)
    .then(data => res.json(data))
    .catch(next)
}

async function myAppliedPositions(req, res, next) {
  const currentUser = req.user;
  let data;
  try {
    data = await getMyAppliedPositions(currentUser);
  } catch(e) {
    next(e);
  }

  res.json(data);
}

async function updateAvatar(req, res, next) {
  const { user } = req;
  const image = req.file.buffer;
  const imageName = req.file.originalname;
  let imageUrl;
  try {
    imageUrl = await saveAvatar(user, image, imageName);
  } catch(e) {
    res.status(404).json({
      error: 'There was a problem adding updating your avatar'
    });
  }
  res.send(imageUrl);
}



// The user controller object
module.exports = {
  create,
  show,
  update,
  getProfile,
  myAppliedPositions,
  updateAvatar
};
