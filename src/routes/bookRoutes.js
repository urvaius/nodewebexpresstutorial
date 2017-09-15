var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');
var router = function (nav) {



    var books = [{
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'Les Miserables',
            genre: 'Historical Fiction',
            author: 'forget his name',
            read: true
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'HG Wells',
            read: false

        }
    ];
    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
            request.query('select * from books',
                function (err, recordset) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
}
module.exports = router;