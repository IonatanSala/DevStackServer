const assert = require('chai').assert;
const User = require('../../../models/user');
const Story = require('../../../models/story/story');

describe('Creating a Story', () => {
let newUser, newStoryExperience;

  beforeEach(done => {
    newUser = new User({
      email: 'test@test.com',
      password: 'testing'
    });

    const typeOfStory = 'experience';

    newStoryExperience = new Story({
      type: typeOfStory,
      [typeOfStory]: {
        title: 'My Story',
        companyName: 'My Company',
        from: new Date() - 1000,
        to: new Date(),
        description: "Test description",
        skillsInvolved: ['skill0', 'skill']
      }
    });

    // create association
    newUser.stories.push(newStoryExperience)
    Promise.all([newUser.save(), newStoryExperience.save()])
      .then((results) => done());
  });

  it('creates a story of type "experience"', (done) => {
    const typeOfStory = 'experience';

    const newStory = new Story({
      type: typeOfStory,
      [typeOfStory]: {
        title: 'First Story',
        companyName: 'Test Company',
        from: new Date() - 1000,
        to: new Date(),
        description: "This is some test description",
        skillsInvolved: ['skill1', 'skill2']
      }
    });

    newStory.save()
      .then(story => {
        assert(story.type === typeOfStory);
        assert(story[typeOfStory].title === 'First Story');
        assert(story[typeOfStory].skillsInvolved[1] === 'skill2');
        done();
      })
  });

  it('creates a story of type "project"', (done) => {
    const typeOfStory = 'project';

    const newStory = new Story({
      type: typeOfStory,
      [typeOfStory]: {
        title: 'First Story',
        url: 'http://test.com',
        description: "This is some test description",
        skillsInvolved: ['skill1', 'skill2']
      }
    });

    newStory.save()
      .then(story => {
        assert(story.type === typeOfStory);
        assert(story[typeOfStory].title === 'First Story');
        assert(story[typeOfStory].url === 'http://test.com');
        done();
      })
  });

  it('creates a story of type "education"', (done) => {
    const typeOfStory = 'education';

    const newStory = new Story({
      type: typeOfStory,
      [typeOfStory]: {
        name: 'Maynooth University',
        degree: 'Bachelors of Science',
        fieldOfStudy: 'Computer Science & Software Engineering',
        from: new Date("09-16-2013"),
        to: new Date("09-16-2017"),
        societies: ['Minds'],
        description: 'Test description for education story'
      }
    });

    newStory.save()
      .then(story => {
        assert(story.type === typeOfStory);
        assert(story[typeOfStory].name === 'Maynooth University');
        assert(story[typeOfStory].degree === 'Bachelors of Science');
        assert(story[typeOfStory].fieldOfStudy === 'Computer Science & Software Engineering');
        assert(story[typeOfStory].societies[0] === 'Minds');
        assert(story[typeOfStory].description === 'Test description for education story');
        done();
      })
  });

  it('creates a story of type "volunteer"', (done) => {
    const typeOfStory = 'volunteer';

    const newStory = new Story({
      type: typeOfStory,
      [typeOfStory]: {
        organization: 'Test',
        role: 'Test role',
        cause: 'animalRights',
        from: new Date("09-16-2013"),
        stillThere: true,
        description: 'Test description for volunteer story'
      }
    });

    newStory.save()
      .then(story => {
        assert(story.type === typeOfStory);
        assert(story[typeOfStory].organization === 'Test');
        assert(story[typeOfStory].role === 'Test role');
        assert(story[typeOfStory].cause === 'animalRights');
        assert(story[typeOfStory].description === 'Test description for volunteer story');
        done();
      })
  });

  it('creates a story with association to user', (done) => {
    User.findOne({email: 'test@test.com'})
      .populate('stories')
      .then(user => {
        assert(user.email === 'test@test.com');
        assert(user.stories[0].type === 'experience');
        assert(user.stories[0].experience.title === 'My Story');
        done();
      })
  });

});
