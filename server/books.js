const express = require('express');
const booksRouter = express.Router();
const sqlite3 = require('sqlite3');

// open up the SQLite database in './database.sqlite'
const db = new sqlite3.Database('./database.sqlite');

// Get all books
booksRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Book', (error, rows) => {
        if (error) {
            throw error;
        }
        res.status(200).send(rows);
    })  
});

// Get a book by id
booksRouter.get('/:id', (req, res, next) => {
    db.get('SELECT * FROM Book WHERE id = $id', {$id: req.params.id}, (error, row) => {
        if (error) {
            throw error;
        }

        if(row === undefined)
            res.status(404).send('non-numeric bookId');
        else if(!isNaN(req.params.id))
            res.status(200).send(row);
        else 
            res.status(404).send('No such bookId');
    })  
});

module.exports = booksRouter;