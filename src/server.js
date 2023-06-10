const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
const connect = async () => {
  await mongoose.connect(DB);
  console.log('Connection to DATABASE established');
};

connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
