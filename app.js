const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const requestRouter = require('./routes/requestRoutes');
const fileRouter = require('./routes/fileRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Processing your request...');
  next();
});

app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/file', fileRouter);

module.exports = app;
