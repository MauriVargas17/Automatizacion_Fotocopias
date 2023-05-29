const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authController = require('../controllers/authController');

router
  .route('/')
  .post(authController.protect, fileController.uploadFiles)
  .get(authController.protect, fileController.getListOfFiles);

router
  .route('/:name')
  .get(authController.protect, fileController.downloadByName)
  .delete(authController.protect, fileController.deleteByName);

module.exports = router;
