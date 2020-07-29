# Full stack demo web app project

## Technologies used
### Backend
* Node
  * Including Frameworks:
    * Express
    * Morgan
    * Body-Parser
    * Cors
    * Error-handler
    * HTTPS

### Frontend
* Javascript/ES6/JSX
* React
* HTML
* CSS

### Database
* SQLLite

### Tests
* Mocha/Chai

## Available Scripts

In the project directory, you can run:

### `node setup.js`

Creates and seeds the database


### `node server.js`

Starts the server. <br />


### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## APIs

### Books
[http://localhost:4001/api/book](http://localhost:4001/api/book) to get list of all books

[http://localhost:4001/api/book/1](http://localhost:4001/api/book/1) to get book with bookId = 1

### Reviews
[http://localhost:4001/api/review](http://localhost:4001/api/review) to get all reviews

[http://localhost:4001/api/review/1](http://localhost:4001/api/review/1) to get review with reviewId = 1

[http://localhost:4001/api/review?bookId=1](http://localhost:4001/api/review?bookId=1) to get reviews for book with bookId = 1

### Ratings
[http://localhost:4001/api/rating](http://localhost:4001/api/rating) to get ratings for all books

[http://localhost:4001/api/rating/1](http://localhost:4001/api/rating/1) to get a rating with ratingId = 1

[http://localhost:4001/api/rating&bookId=1](http://localhost:4001/api/rating&bookId=1) to get ratings for book with bookId = 1
