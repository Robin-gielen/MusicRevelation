var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'test');

var userLogs = new Schema({
    nom: { type: String, required: true},
    mdp: { type: String, required: true}
});

module.exports = db.model('utilisateur', userLogs);
