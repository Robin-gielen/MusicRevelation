var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
