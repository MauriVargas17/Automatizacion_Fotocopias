const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router
  .route('/')
  .get(requestController.getAllRequests)
  .post(requestController.postRequest);

module.exports = router;
