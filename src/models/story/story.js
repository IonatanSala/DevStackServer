const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ExperienceSchema = require('./experience_schema');
const ProjectSchema = require('./project_schema');
const EducationSchema = require('./education_schema');
const VolunteerSchema = require('./volunteer_schema');

const StorySchema = new Schema({
  type: {
    type: String,
    enum: ['experience', 'project', 'education', 'volunteer'],
    required: true
  },
  experience: ExperienceSchema,
  project: ProjectSchema,
  education: EducationSchema,
  volunteer: VolunteerSchema
});

StorySchema.pre('remove', function(next) {
  const User = mongoose.model('user');
  User.findOne({stories: this._id})
    .then((user) => {
      user.stories.pull(this._id)
      return user.save()
    })
    .then(() => next());
});

const Story = mongoose.model('story', StorySchema);

module.exports = Story;
