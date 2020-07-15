const express = require('express');
const apiRouter = express.Router()

// Import and mount the booksRouter
const booksRouter = require('./books.js');
apiRouter.use('/book', booksRouter);

// Import and mount the reviewsRouter
const reviewsRouter = require('./reviews.js');
apiRouter.use('/review', reviewsRouter);

module.exports = apiRouter;