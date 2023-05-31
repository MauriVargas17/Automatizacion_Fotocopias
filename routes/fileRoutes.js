const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authController = require('../controllers/authController');
const csvController = require('./../controllers/csvController');

router
  .route('/')
  .post(authController.protect, fileController.uploadFiles)
  .get(authController.protect, fileController.getListOfFiles);

router
  .route('/reports')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    csvController.downloadAsCSV
  );

router
  .route('/:name')
  .get(authController.protect, fileController.downloadByName)
  .delete(authController.protect, fileController.deleteByName);

module.exports = router;
