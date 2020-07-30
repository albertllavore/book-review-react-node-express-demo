const express = require('express');
const reviewsRouter = express.Router();
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

// open up the SQLite database in './database.sqlite'
const db = new sqlite3.Database('./database.sqlite');

reviewsRouter.use(bodyParser.json());

// Get all reviews
reviewsRouter.get('/', (req, res, next) => {
    let query = req.query;
    let filter = "";
    if(query.bookId){
        filter = `WHERE book_id = '${query.bookId}'`;
    }
    db.all(`SELECT * FROM Review ${filter}`, (error, rows) => {
        if (error) {
            res.sendStatus(400);
        }
        res.status(200).send(rows);
    })  
});

// Get reviews for a book by review id
reviewsRouter.get('/:id', (req, res, next) => {
    db.get('SELECT * FROM Review WHERE id = $id', {$id: req.params.id}, (error, row) => {
        if (error) {
            res.sendStatus(400);
        }

        if(row === undefined)
            res.status(404).send('non-numeric id');
        else if(!isNaN(req.params.id))
            res.status(200).send(row);
        else 
            res.status(404).send('No such id');
    })  
});

// Create a review
reviewsRouter.post('/', (req, res, next) => {
    const rev = req.body;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    let review = {
        author: rev.author,
        summary: rev.summary,
        review: rev.review,
        rating: Number(rev.rating),
        date: date,
        bookId: Number(req.query.bookId)
    }

    db.run("INSERT INTO Review (author, summary, review, rating, date, book_id) VALUES " +
        "($author, $summary, $review, $rating, $date, $book_id)", 
        {$author: review.author, $summary: review.summary, $review: review.review, $rating: review.rating, $date: review.date, $book_id: review.bookId}, 
        function(err){
            if (err) {
                res.status(400).send();
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.status(201).send(review);
        }
    );
    
});

module.exports = reviewsRouter;