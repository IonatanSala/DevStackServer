const User = require('../../models/user');
const bcrypt = require('bcrypt-nodejs');
const { tokenForUser } = require('../../helpers/auth');

/*
  creates a new user
*/
const createUser = (email, password, isEmployer) => {
  return new Promise((resolve, reject) => {

    if(!email || !password) {
      return reject({error: { message: 'You must provide email and password', status: 422}});
    }

    User.findOne({email})
      .then(user => {
        if(user) return reject({
          error: {
            message: 'Email already exsists',
            status: 422
          }});

        // hash the password
        const hash = bcrypt.hashSync(password);
        password = hash;

        const newUser = new User({ email, password, isEmployer});
        return newUser.save();
      })
      .then(newUser => {
        resolve({data: { token: tokenForUser(newUser), email: newUser.email, isEmployer: newUser.isEmployer }})
      })
      .catch(err => reject(err))
  });
}

module.exports = createUser;
