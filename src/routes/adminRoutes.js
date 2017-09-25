var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


var books = [{
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        bookId: 656,
        read: false
    },
    {
        title: 'elf stones of shannara',
        genre: 'Fantasy',
        author: 'Terry brooks',
        read: true

    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'forget his name',
        bookId: 24280,
        read: true
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'HG Wells',
        read: false

    }
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            // var url = 'mongodb://localhost:27017/libraryApp';
            var url = 'mongodb://urvaius:Buffy11$@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/libraryApp?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });
            // res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;