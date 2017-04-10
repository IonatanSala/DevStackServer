const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/engineer_stack_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
})

beforeEach(done => {
  const { stories, users } = mongoose.connection.collections;

  users.drop()
    .then(() => stories.drop())
    .then(() => done())
    .catch(() => done());
});
