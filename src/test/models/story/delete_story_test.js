const assert = require('chai').assert;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Story = mongoose.model('story');

describe('DELETE Story', () => {
  let jonno, myProject;

  beforeEach((done) => {
    jonno = new User({
      email: 'jonno@test.com',
      password: 'testing123'
    });

    myProject = new Story({
      type: 'project',
      project: {
        title: 'Test Project',
        url: 'http://test.com',
        skillsInvolved: ['skill1'],
        description: 'Description'
      }
    });

    jonno.stories.push(myProject);

    Promise.all([jonno.save(), myProject.save()])
      .then(() => done());
  });

  it('Removing a story with a user association should remove sub document from user', (done) => {
    Story.findOne({})
      .then((story) => story.remove())
      .then(() => Story.findOne({}))
      .then((story) => assert(story === null))
      .then(() => User.findOne({}))
      .then((user) => {
        assert(user.stories.length === 0);
        done();
      })
  });
});
