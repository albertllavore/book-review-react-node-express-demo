const express = require('express');
const reviewsRouter = express.Router();
const sqlite3 = require('sqlite3');

// open up the SQLite database in './database.sqlite'
const db = new sqlite3.Database('./database.sqlite');

// Get all reviews
reviewsRouter.get('/', (req, res, next) => {
    let query = req.query;
    let filter = "";
    if(query.book_id){
        filter = `WHERE book_id = '${query.book_id}'`;
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
        res.status(200).send([row]);
    })  
});

module.exports = reviewsRouter;