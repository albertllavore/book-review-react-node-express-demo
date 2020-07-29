# Full stack demo web app project
[demo](https://react-node-demo-285306.wn.r.appspot.com/)

## Technologies used
### Backend/API
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

## Available Scripts to run locally

In the project directory, you can run:

### `npm run setup`

Creates and seeds the database

### `npm run build`

Creates and seeds the database

### `npm run start`

Starts the server and runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## APIs

### Books
[http://localhost:8080/api/book](http://localhost:8080/api/book) to get list of all books

[http://localhost:8080/api/book/1](http://localhost:8080/api/book/1) to get book with bookId = 1

### Reviews
[http://localhost:8080/api/review](http://localhost:8080/api/review) to get all reviews

[http://localhost:8080/api/review/1](http://localhost:8080/api/review/1) to get review with reviewId = 1

[http://localhost:8080/api/review?bookId=1](http://localhost:8080/api/review?bookId=1) to get reviews for book with bookId = 1

### Ratings
[http://localhost:8080/api/rating](http://localhost:8080/api/rating) to get ratings for all books

[http://localhost:8080/api/rating/1](http://localhost:8080/api/rating/1) to get a rating with ratingId = 1

[http://localhost:8080/api/rating&bookId=1](http://localhost:8080/api/rating&bookId=1) to get ratings for book with bookId = 1
