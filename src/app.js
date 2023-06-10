const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const requestRouter = require('./src/routes/requestRoutes');
const fileRouter = require('./src/routes/fileRoutes');
const userRouter = require('./src/routes/userRoutes');

const app = express();
app.use(cors());

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

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS (HTML script attack)
app.use(xss());

app.use((req, res, next) => {
  console.log('Processing your request...');
  next();
});

app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/users', limiter, userRouter);

module.exports = app;
