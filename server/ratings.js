const express = require('express');
const ratingsRouter = express.Router();
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

// open up the SQLite database in './database.sqlite'
const db = new sqlite3.Database('./database.sqlite');

ratingsRouter.use(bodyParser.json());

// Get all ratings
ratingsRouter.get('/', (req, res, next) => {
    let query = req.query;
    let filter = "";
    if(query.bookId){
        filter = `WHERE book_id = '${query.bookId}'`;
    }
    db.all(`SELECT * FROM Rating ${filter}`, (error, rows) => {
        if (error) {
            res.sendStatus(400);
        }
        res.status(200).send(rows);
    })  
});

// Get reviews for a book by rating id
ratingsRouter.get('/:id', (req, res, next) => {
    db.get('SELECT * FROM Rating WHERE id = $id', {$id: req.params.id}, (error, row) => {
        if (error) {
            res.sendStatus(400);
        }
        res.status(200).send([row]);
    })  
});

module.exports = ratingsRouter;