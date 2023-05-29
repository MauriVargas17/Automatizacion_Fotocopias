const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getAllRequests
  )
  .post(authController.protect, requestController.postRequest);

router
  .route('/:id')
  .get(authController.protect, requestController.getRequest)
  .delete(authController.protect, requestController.deleteRequest);

module.exports = router;
