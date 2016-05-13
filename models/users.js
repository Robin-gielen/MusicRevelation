var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// user schema
var UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  artistName: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});


module.exports = mongoose.model('User', UserSchema);
