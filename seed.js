const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');
const https = require('https');

/*
    Assumptions
    - Different books are seperated by an empty newline
    - For each book, each parameter is its own line
    - A book is made up of 4 lines: 1) title 2) author | publisher 3) summary 4) image
        THE GUEST LIST
        by Lucy Foley | Morrow
        A wedding between a TV star and a magazine publisher on an island off the coast of Ireland turns deadly.
        https://s1.nyt.com/du/books/images/9780062868930.jpg
*/

let booksArr = [];
let book = {};
let fileArr = [];

const populateBookObject = (arr) => {
  let lineNum = 1;
  arr.forEach((line, index) => {
    let i = index + 1;
    if(i % 5 === 0) { // every 5 lines is a new book
      book = {};
      lineNum = 1;
    }else{
      switch (lineNum) {
          case 1:
            book.title = line;
            break;
          case 2:
            let ap = line.split(' | ');
            book.author = ap[0].replace("by ", "");
            book.publisher = ap[1];
            break;
          case 3: 
            book.summary = line;
            break;
          case 4:
            book.img = line;
            booksArr.push(book);
            break;
          default:
            break;
      }
      lineNum++;
    }
  });
}

const seedBookAndReviewDatabases = () => {
  db.serialize(function() {
    db.run('DROP TABLE IF EXISTS Book');

    db.run('CREATE TABLE IF NOT EXISTS `Book` ( ' +
        '`id` INTEGER PRIMARY KEY autoincrement, ' +
        '`title` TEXT NOT NULL, ' +
        '`author` TEXT NOT NULL, ' +
        '`publisher` TEXT NOT NULL, ' +
        '`summary` TEXT NOT NULL, ' +
        '`img` TEXT NOT NULL, ' +
        '`rating` FLOAT(10,2) NOT NULL ' +
    ')');

    booksArr.forEach((book, index) => {
        db.run("INSERT INTO Book (title, author, publisher, summary, img, rating) VALUES ($title, $author, $publisher, $summary, $img, $rating)", 
              {$title: book.title, $author: book.author, $publisher: book.publisher, $summary: book.summary, $img: book.img, $rating: 0});
    });

    db.run('DROP TABLE IF EXISTS Review');

    db.run('CREATE TABLE IF NOT EXISTS `Review` ( ' +
        '`id` INTEGER PRIMARY KEY autoincrement, ' +
        '`author` TEXT NOT NULL, ' +
        '`summary` TEXT NOT NULL, ' +
        '`review` TEXT NOT NULL, ' +
        '`rating` INTEGER NOT NULL, ' +
        '`date` DATE NOT NULL, ' +
        '`book_id` INTEGER NOT NULL, ' +
        'FOREIGN KEY (`book_id`) REFERENCES `Book` (`id`) ' +
    ')');

    db.run('DROP TABLE IF EXISTS Rating');

    db.run('CREATE TABLE IF NOT EXISTS `Rating` ( ' +
        '`id` INTEGER PRIMARY KEY autoincrement, ' +
        '`average_rating` FLOAT(10,2) NOT NULL, ' +
        '`total_rating` INTEGER NOT NULL, ' +
        '`number_of_reviews` INTEGER NOT NULL, ' +
        '`book_id` INTEGER NOT NULL, ' +
        'FOREIGN KEY (`book_id`) REFERENCES `Book` (`id`) ' +
    ')');

    db.run(
      'CREATE TRIGGER aft_review_insert ' +
        'AFTER INSERT ON Review ' +
      'BEGIN ' +
        'UPDATE Rating ' +
        'SET number_of_reviews = number_of_reviews + 1, ' +
        'total_rating = total_rating + new.rating ' +
        'WHERE book_id = new.book_id; ' + 
      'END;'
    );

    db.run(
      'CREATE TRIGGER aft_rating_insert ' +
        'AFTER UPDATE ON Rating ' +
      'BEGIN ' +
        'UPDATE Rating ' +
        'SET average_rating = CAST(total_rating AS decimal(10,2)) / CAST(number_of_reviews AS decimal(10,2)) ' +
        'WHERE book_id = new.book_id; ' + 
      'END;'
    );

    db.run(
      'CREATE TRIGGER aft_rating_update ' +
        'AFTER UPDATE OF average_rating ON Rating ' +
      'BEGIN ' +
        'UPDATE Book ' +
        'SET rating = new.average_rating ' +
        'WHERE id = new.book_id; ' + 
      'END;'
    );

    let sql = `SELECT * FROM Book`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((book) => {
        db.serialize(function() {
          db.run("INSERT INTO Rating (average_rating, total_rating, number_of_reviews, book_id) VALUES ($average_rating, $total_rating, $number_of_reviews, $book_id)", 
          {$average_rating: 0.00, $total_rating: 0, $number_of_reviews: 0, $book_id: book.id});

          let today = new Date();
          let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          let rating = Math.floor(Math.random() * 6);
        
          db.run("INSERT INTO Review (author, summary, review, rating, date, book_id) VALUES " +
                "($author, $summary, $review, $rating, $date, $book_id)", 
                {$author: "Wes Llavore", 
                  $summary: "Summary Review for " + book.title, 
                  $review: "Here is my review for " + book.title + " I loved it!!!! I would recommend to anyone!", 
                  $rating: rating, 
                  $date: date, $book_id: book.id
                });
  
          rating = Math.floor(Math.random() * 6);
          let review = "Here is my review for " + book.title + " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum luctus ante a consequat. Nulla facilisi. Nullam aliquam velit vel ex rhoncus, sed mollis lacus malesuada. Duis nec metus mattis neque dictum venenatis sit amet a neque. Suspendisse ultricies vulputate justo, et porttitor leo lobortis et. Nunc id vestibulum justo, in ornare lectus. Cras consequat, eros sed pharetra gravida, ipsum magna placerat mauris, in sagittis mauris purus sed urna. Proin sed dolor mattis, finibus odio sed, laoreet orci. Nunc nec velit at enim pharetra interdum vitae at est. Duis ac ultrices elit."
        
          db.run("INSERT INTO Review (author, summary, review, rating, date, book_id) VALUES " +
          "($author, $summary, $review, $rating, $date, $book_id)", 
          {$author: "Warren Llavore", 
            $summary: "Lorem ipsum " + book.title, 
            $review: review, 
            $rating: rating, 
            $date: date, $book_id: book.id
          });
  
          rating = Math.floor(Math.random() * 6);
          review = "Here is my review for " + book.title + " Phasellus lobortis fringilla maximus. Integer lacinia eleifend augue, a porttitor arcu. In enim quam, hendrerit a ante sit amet, rutrum bibendum ex. Donec quis fermentum orci. Ut elementum bibendum nisi vel efficitur. Etiam eget urna vitae tellus iaculis hendrerit. Nulla at tincidunt turpis. Donec nibh justo, feugiat nec tincidunt at, laoreet vel tellus. Duis non elit varius, aliquam neque ac, hendrerit leo. Vivamus sed massa molestie tortor eleifend dictum id quis lacus. Vestibulum pellentesque mi eu mauris auctor commodo."
        
          db.run("INSERT INTO Review (author, summary, review, rating, date, book_id) VALUES " +
          "($author, $summary, $review, $rating, $date, $book_id)", 
          {$author: "Chloe Llavore", 
            $summary: "Lorem ipsum " + book.title, 
            $review: review, 
            $rating: rating, 
            $date: date, $book_id: book.id
          });
        });
      });
    });
  });
}

const getBooksAndProcess = () => {
  https.get('https://raw.githubusercontent.com/moonvd/hw/master/books.txt', (resp) => {
    let data = '';
  
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Process the results.
    resp.on('end', () => {
      fileArr = data.split('\n');
      populateBookObject(fileArr);
      seedBookAndReviewDatabases();
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

module.exports = {
  getBooksAndProcess: getBooksAndProcess
};