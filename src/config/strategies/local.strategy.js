var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            // var url = 'mongodb://localhost:27017/libraryApp';
            var url = 'mongodb://urvaius:Buffy11$@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/libraryApp?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users')
                collection.findOne({
                        username: username
                    },
                    function (err, results) {
                        if (results.password === password) {
                            var user = results;
                            done(null, user);
                        } else {
                            done(null, false, {
                                message: 'Bad password'
                            });
                        }


                    }
                );
            });
        }));
};