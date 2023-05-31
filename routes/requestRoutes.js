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
  .post(authController.protect, requestController.postRequest)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.deleteAllRequests
  );

router
  .route('/stats')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getRequestsStats
  );

router
  .route('/plan/month/:date')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getMonthlyPlan
  );

router
  .route('/plan/year/:date')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getYearlyPlan
  );

router
  .route('/completed/month/:date')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getMonthlyCompleted
  );

router
  .route('/completed/year/:date')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getYearlyCompleted
  );

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
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.completeRequest
  );

router
  .route('/date/:date')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    requestController.getRequestsByDate
  );

module.exports = router;
