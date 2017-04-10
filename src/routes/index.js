const passport = require('passport');

// routes
const userRoutes = require('./user');
const authRoutes = require('./auth');
const storyRoutes = require('./story');
const opportunityRoutes = require('./opportunity');
const opportunityApplication = require('./opportunityApplication');

const router = (app) => {
  app
    .use('/users', userRoutes)
    .use('/auth', authRoutes)
    .use('/stories', storyRoutes)
    .use('/opportunities', opportunityRoutes)
    .use('/opportunityApplication', opportunityApplication);
  ;
}

module.exports = router;
