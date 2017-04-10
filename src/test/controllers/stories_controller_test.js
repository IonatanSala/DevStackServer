const assert = require('chai').assert;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('user');
const Story = mongoose.model('story');

describe('Stories Controller', () => {
  let jono, jwtToken, newStoryProps;

  beforeEach((done) => {
    newStoryProps = {
      type: 'project',
      project: {
        title: 'Test Project',
        url: 'http://test.com',
        skillsInvolved: ['skill1'],
        description: 'Description'
      }
    };

    const newUserProps = {
      email: 'jonno@test.com',
      password: 'testing123'
    };

    jonno = new User(newUserProps);

    jonno.save()
      .then(() => {
        request(app)
          .post('/auth')
          .send(newUserProps)
          .end((err, res) => {
            jwtToken = res.body.token;
            done();
          });
      });
  });

  it('POST to /stories should create a story that belongs to the user', (done) => {
    request(app)
      .post('/stories')
      .set('authorization', jwtToken)
      .send(newStoryProps)
      .end((err, res) => {
        const createdStory = res.body;

        User.find({email: 'jonno@test.com'})
          .populate('stories')
          .then((user) => {
            assert(user[0].stories[0]._id.toString() === createdStory._id.toString());
            assert(user[0].stories[0].project.title === 'Test Project');
            done();
          });

      });
  });

  it('GET to /stories should get all stories belonging to the user', (done) => {
    let userStory = new Story(newStoryProps);
    jonno.stories.push(userStory);

    const anotherStory = new Story({
      type: 'project',
      project: {
        title: 'Another Project',
        url: 'http://another.com',
        skillsInvolved: ['skill2'],
        description: 'Desc'
      }
    });

    Promise.all([jonno.save(), userStory.save(), anotherStory.save()])
      .then((results) => {
        request(app)
          .get('/stories')
          .set('authorization', jwtToken)
          .end((err, res) => {
            assert(res.body.length === 1);
            assert(res.body[0].project.title === 'Test Project');
            done();
          })
      });
  });

  it('DELETE to /stories/:id should delete the story and sub document in the users collection', (done) => {
    let userStory = new Story(newStoryProps);
    jonno.stories.push(userStory);

    Promise.all([jonno.save(), userStory.save()])
      .then((results) => {
        request(app)
          .delete(`/stories/${userStory._id}`)
          .set('authorization', jwtToken)
          .end((err, res) => {
            assert(res.status === 204);
            Promise.all([User.findOne({}), Story.findOne({})])
              .then((results) => {
                assert(results[0].stories.length === 0)
                assert(results[1] === null);
                done();
              });
          });
      });
  });

});
