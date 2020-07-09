var mongoose = require('mongoose');

//Connection
mongoose.connect('mongodb://localhost:27017/Avocat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose