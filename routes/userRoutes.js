const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMyUser',
  authController.protect,
  userController.updateMyUser
);

router.delete(
  '/deleteMyUser',
  authController.protect,
  userController.deleteMyUser
);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

module.exports = router;
