// configure database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/engineer_stack');
}
