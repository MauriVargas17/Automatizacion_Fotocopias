const express = require('express');
const morgan = require('morgan');
const requestRouter = require('./routes/requestRoutes');

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

module.exports = app;
