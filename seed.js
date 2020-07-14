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

const seedBookDatabase = () => {
  db.serialize(function() {
    db.run('DROP TABLE IF EXISTS Book');
    db.run('CREATE TABLE IF NOT EXISTS `Book` ( ' +
            '`id` INTEGER PRIMARY KEY, ' +
            '`title` TEXT NOT NULL, ' +
            '`author` TEXT NOT NULL, ' +
            '`publisher` TEXT NOT NULL, ' +
            '`summary` TEXT NOT NULL, ' +
            '`img` TEXT NOT NULL ' +
          ')');
    booksArr.forEach((book, index) => {
        db.run("INSERT INTO Book (id, title, author, publisher, summary, img) VALUES ($id, $title, $author, $publisher, $summary, $img)", 
              {$id: index, $title: book.title, $author: book.author, $publisher: book.publisher, $summary: book.summary, $img: book.img});
    });
  });
}

const getBooks = () => {
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
      seedBookDatabase();
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

module.exports = {
  getBooks: getBooks
};