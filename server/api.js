const express = require('express');
const apiRouter = express.Router()

// Import and mount the booksRouter
const booksRouter = require('./books.js');
apiRouter.use('/book', booksRouter);

// Import and mount the reviewsRouter
const reviewsRouter = require('./reviews.js');
apiRouter.use('/review', reviewsRouter);

// Import and mount the ratingsRouter
const ratingsRouter = require('./ratings.js');
apiRouter.use('/rating', ratingsRouter);

module.exports = apiRouter;