var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var VideoSchema = new Schema({
  url: {
    type: String,   //url of the video
  },
  genre: {
    type: String,
    required: true,
  },
  artistName: {
    type: String
  }
});

module.exports = mongoose.model('Video', VideoSchema);
