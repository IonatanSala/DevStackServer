const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userProfileSchema = require('./userProfileSchema');

const profileSchema = new Schema({
  user: userProfileSchema
});

module.exports = profileSchema;
