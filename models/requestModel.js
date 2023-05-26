const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  user: {
    type: String,
    required: [true, 'A request needs a user who makes the request'],
  },
  faculty: {
    type: String,
    required: [
      true,
      'A request needs the faculty of the user who makes the request',
    ],
  },
  fileName: {
    type: String,
    default: 'NO_FILE_INCLUDED',
  },
  fileSize: String,
  numberOfCopies: {
    type: Number,
    required: [true, 'A request needs the number of copies'],
  },
  pickUpDate: {
    type: String,
    required: [true, 'A request needs the pick up date'],
  },
  pickUpTime: {
    type: String,
    required: [true, 'A request needs the pick up time'],
  },
  isColoured: {
    type: Boolean,
    default: false,
  },
  isFrontAndBack: {
    type: Boolean,
    default: false,
  },
  isRinged: {
    type: Boolean,
    default: false,
  },
  requestIsCompleted: {
    type: Boolean,
    default: false,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
