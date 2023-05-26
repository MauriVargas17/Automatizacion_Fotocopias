const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router
  .route('/')
  .post(fileController.uploadFiles)
  .get(fileController.getListOfFiles);

router
  .route('/:name')
  .get(fileController.downloadByName)
  .delete(fileController.deleteByName);

module.exports = router;
