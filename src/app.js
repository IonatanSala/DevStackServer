// starting point of application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const app = express();
const router = require('./routes/index');

// configure database
require('./config/database');
// configure passport for auth
require('./config/passport');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// App Setup
app
  .use(morgan('combined')) // login incoming request (debugging)
  .use(cors(corsOptions))
  .use(bodyParser.json({ type: 'application/json'})) // parse reqs in json
  .use(bodyParser.urlencoded({ extended: false }));

;

// initialize routes
router(app);

// error handler
app.use((err, req, res, next) => {
  if(err.error) {
    res.status(err.error.status).send({ error: err.error.message })
  }
  next(err);
});

module.exports = app;
