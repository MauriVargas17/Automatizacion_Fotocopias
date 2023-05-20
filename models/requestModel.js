const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  username: {
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
    required: [true, 'A request needs the name of the file'],
    trim: true,
  },
  fileSize: {
    type: String,
    required: [true, 'A request needs the size of the file'],
  },
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
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
