const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const apiRouter = require('./server/api');
const cors = require('cors');

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