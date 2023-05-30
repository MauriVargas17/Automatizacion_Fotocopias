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
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getRequest
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.deleteRequest
  );

router
  .route('/date/:date')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getRequestsByDate
  );

module.exports = router;
