const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const requestRouter = require('./routes/requestRoutes');
const fileRouter = require('./routes/fileRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Secure HTTP Headers
app.use(helmet());

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  console.log('Processing your request...');
  next();
});

app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/users', limiter, userRouter);

module.exports = app;
