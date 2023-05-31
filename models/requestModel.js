const mongoose = require('mongoose');
const validator = require('validator');

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
    enum: ['FIA', 'FACED', 'DAAE'],
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
  numberOfPages: {
    type: Number,
    required: [true, 'A request needs the number of pages of one document'],
  },
  pickUpDate: {
    type: String,
    required: [true, 'A request needs the pick up date'],
    validate: {
      validator: function (el) {
        let currentDate = new Date();
        currentDate = currentDate.toISOString().split('T')[0];
        const [year, month, day] = currentDate.toString().split('-');
        currentDate = year + month + day;
        pickedDate = el.split('-').reverse().join('');

        return (
          el.match(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/) && currentDate <= pickedDate
        );
      },
      message:
        'pickUpDate format is invalid or the pickUpDate chosen is older than today',
    },
  },
  pickUpTime: {
    type: String,
    required: [true, 'A request needs the pick up time'],
    validate: {
      validator: function (el) {
        return el.match(/^[0-9]{2}:[0-9]{2}$/);
      },
      message: 'Must provide a valid time',
    },
  },
  date: {
    type: String,
    select: false,
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
  specifications: String,
  requestIsCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
