const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const apiRouter = require('./api/api');
const cors = require('cors');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Add middleware for parsing request bodies here:
app.use(bodyParser.json());

// Logging Middleware
if (!process.env.IS_TEST_ENV) {
  app.use(morgan('dev'));
}

app.use(cors());

app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;