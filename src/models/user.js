const mongoose = require('mongoose');
const Story = require('./story/story');
const bcrypt = require('bcrypt-nodejs');
const Opportunity = require('./opportunity');
const profileSchema = require('./profile/profileSchema');

const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: String,
  isEmployer: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  stories: [{
    type: Schema.Types.ObjectId,
    ref: 'story'
  }],
  opportunities: [{
    type: Schema.Types.ObjectId,
    ref: 'opportunity'
  }],
  profile: profileSchema
});

// comparing passwords
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) { return callback(err); }
    callback(null, isMatch);
  })
}

// Create model
const User = mongoose.model('user', userSchema);

module.exports = User;
