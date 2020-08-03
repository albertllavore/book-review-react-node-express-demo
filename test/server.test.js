const expect = require('chai').expect;
const {jsdom} = require('jsdom');
const request = require('supertest');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('../database.sqlite');

const app = require('../testserver');

describe('/api/book routes', function() {
  describe('GET /api/book', function() {

    it('returns an array', function() {
      return request(app)
        .get('/api/book')
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an.instanceOf(Array);
        });
    });

    it('returns an array of all books', function() {
      return request(app)
        .get('/api/book')
        .expect(200)
        .then((response) => {
          response.body.forEach((book) => {
            expect(book).to.have.ownProperty('id');
            expect(book).to.have.ownProperty('title');
            expect(book).to.have.ownProperty('summary');
            expect(book).to.have.ownProperty('publisher');
            expect(book).to.have.ownProperty('img');
            expect(book).to.have.ownProperty('rating');
          });
        });
    });

  });

  describe('GET /book/:bookId', function() {
  
      it('returns a single book object', function() {
        return request(app)
          .get(`/api/book/1`)
          .expect(200)
          .then((response) => {
            const book = response.body;
            expect(book).to.be.an.instanceOf(Object);
            expect(book).to.not.be.an.instanceOf(Array);
          });
      });
  
      it('returns a full book object', function() {
        return request(app)
        .get(`/api/book/1`)
        .expect(200)
        .then((response) => {
          let book = response.body;
          expect(book).to.have.ownProperty('id');
          expect(book).to.have.ownProperty('title');
          expect(book).to.have.ownProperty('summary');
          expect(book).to.have.ownProperty('publisher');
          expect(book).to.have.ownProperty('img');
          expect(book).to.have.ownProperty('rating');
        });
      });
  
      it('returned book has the correct book id', function() {
        return request(app)
          .get(`/api/book/1`)
          .expect(200)
          .then((response) => {
            let book = response.body;
            expect(book.id).to.be.an.equal(1);
          });
      });

    it('called with a non-numeric ID returns a 404 error', function() {
      return request(app)
        .get('/api/book/notAnId')
        .expect(404);
    });

    it('called with an invalid ID returns a 404 error', function() {
      return request(app)
        .get('/api/book/450')
        .expect(404);
    });

  });
});

describe('/api/review routes', function() {
  describe('GET /api/review', function() {

    it('returns an array', function() {
      return request(app)
        .get('/api/review')
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an.instanceOf(Array);
        });
    });

    it('returns an array of all reviews', function() {
      return request(app)
        .get('/api/review')
        .expect(200)
        .then((response) => {
          response.body.forEach((review) => {
            expect(review).to.have.ownProperty('id');
            expect(review).to.have.ownProperty('author');
            expect(review).to.have.ownProperty('summary');
            expect(review).to.have.ownProperty('review');
            expect(review).to.have.ownProperty('rating');
            expect(review).to.have.ownProperty('date');
            expect(review).to.have.ownProperty('book_id');
          });
        });
    });

  });

  describe('GET /review/:reviewId', function() {
  
    it('returns a single review object by review id', function() {
      return request(app)
        .get(`/api/review/1`)
        .expect(200)
        .then((response) => {
          const review = response.body;
          expect(review).to.be.an.instanceOf(Object);
          expect(review).to.not.be.an.instanceOf(Array);
        });
    });

    it('returns a full review object', function() {
      return request(app)
      .get(`/api/review/1`)
      .expect(200)
      .then((response) => {
        let review = response.body;
        expect(review).to.have.ownProperty('id');
        expect(review).to.have.ownProperty('author');
        expect(review).to.have.ownProperty('summary');
        expect(review).to.have.ownProperty('review');
        expect(review).to.have.ownProperty('rating');
        expect(review).to.have.ownProperty('date');
        expect(review).to.have.ownProperty('book_id');
      });
    });

    it('called with a non-numeric ID returns a 404 error', function() {
      return request(app)
        .get('/api/review/notAnId')
        .expect(404);
    });

    it('called with an invalid ID returns a 404 error', function() {
      return request(app)
        .get('/api/review/450')
        .expect(404);
    });

  });

  describe('GET /review?bookId=xxx', function() {
  
    it('returns an array of review objects by bookId', function() {
      return request(app)
        .get(`/api/review?bookId=1`)
        .expect(200)
        .then((response) => {
          const reviews = response.body;
          expect(reviews).to.be.an.instanceOf(Array);
        });
    });

    it('returns an array of full review objects', function() {
      return request(app)
      .get(`/api/review?bookId=1`)
      .expect(200)
      .then((response) => {
        response.body.forEach((review) => {
          expect(review).to.have.ownProperty('id');
          expect(review).to.have.ownProperty('author');
          expect(review).to.have.ownProperty('summary');
          expect(review).to.have.ownProperty('review');
          expect(review).to.have.ownProperty('rating');
          expect(review).to.have.ownProperty('date');
          expect(review).to.have.ownProperty('book_id');
        });
      });
    });

    it('called with a non-numeric bookId returns a 404 error', function() {
      return request(app)
        .get('/api/review?bookId=notAnId')
        .expect(404);
    });

    it('called with an invalid bookId returns a 404 error', function() {
      return request(app)
        .get('/api/review?bookId=450')
        .expect(404);
    });

  });

  describe('POST /api/review/:reviewId and DELETE /api/review/:reviewId', function() {

    it('should add a new review if all supplied information is correct', function() {
      before(() => { console.log("before") });
      let initialReviewsArray;
      let postReviewsArray;
  
      let newReviewObject = {
        author: 'Wes Llavore',
        summary: 'My Summary for the book',
        review: 'My Review for the book!!!!!',
        rating: 1,
        bookId: 1
      }
  
      after('delete create review', () => { 
        // delete the created review
        return request(app)
          .delete('/api/review/' + newReviewObject.id)
          .send()
          .expect(200)
          .then(() =>{
            return request(app)
              .get('/api/review')
              .then((response) => {
                postReviewsArray = response.body;
              })
              .then(()=>{
                // verify we are back to the initial array
                expect(initialReviewsArray).to.be.deep.equal(postReviewsArray);
              })
          });
      });
      
      return request(app)
        .get('/api/review')
        .then((response) => {
          initialReviewsArray = response.body;
        })
        .then(() => {
          return request(app)
            .post('/api/review')
            .send(newReviewObject)
            .expect(201);
        })
        .then((response) => response.body)
        .then((createdReview) => {
          newReviewObject.id = createdReview.id;
          newReviewObject.date = createdReview.date;
          expect(newReviewObject).to.be.deep.equal(createdReview);
        });
    });
  
  });
});

describe('/api/rating routes', function() {
  describe('GET /api/rating', function() {

    it('returns an array', function() {
      return request(app)
        .get('/api/rating')
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an.instanceOf(Array);
        });
    });

    it('returns an array of all book ratings', function() {
      return request(app)
        .get('/api/rating')
        .expect(200)
        .then((response) => {
          response.body.forEach((rating) => {
            expect(rating).to.have.ownProperty('id');
            expect(rating).to.have.ownProperty('average_rating');
            expect(rating).to.have.ownProperty('total_rating');
            expect(rating).to.have.ownProperty('number_of_reviews');
            expect(rating).to.have.ownProperty('book_id');
          });
        });
    });

  });

  describe('GET /rating/:ratingId', function() {
  
      it('returns a rating for a single book ', function() {
        return request(app)
          .get(`/api/rating/1`)
          .expect(200)
          .then((response) => {
            const rating = response.body;
            expect(rating).to.be.an.instanceOf(Object);
            expect(rating).to.not.be.an.instanceOf(Array);
          });
      });
  
      it('returns a full rating object', function() {
        return request(app)
        .get(`/api/rating/1`)
        .expect(200)
        .then((response) => {
          let rating = response.body;
          expect(rating).to.have.ownProperty('id');
          expect(rating).to.have.ownProperty('average_rating');
          expect(rating).to.have.ownProperty('total_rating');
          expect(rating).to.have.ownProperty('number_of_reviews');
          expect(rating).to.have.ownProperty('book_id');
        });
      });
  
      it('returned book has the correct rating id', function() {
        return request(app)
          .get(`/api/rating/1`)
          .expect(200)
          .then((response) => {
            let rating = response.body;
            expect(rating.id).to.be.an.equal(1);
          });
      });

    it('called with a non-numeric ratingId returns a 404 error', function() {
      return request(app)
        .get('/api/rating/notAnId')
        .expect(404);
    });

    it('called with an invalid ratingId returns a 404 error', function() {
      return request(app)
        .get('/api/rating/450')
        .expect(404);
    });

  });

  /*
    todo: Add tests to check rating table being updated on review creation and deletion
  */

});