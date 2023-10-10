const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
// var auth = require('../services/authentication');
// var checkRole = require('../services/checkRole');


router.post('/signup',userController.createUser);

router.post('/login', userController.loginUser);

router.post('/forgotpassword', userController.forgetPassword);

router.get('/get', userController.createUser);

router.patch('/update', userController.updateUser);

router.post('/product/order', userController.userProduct);

router.get('/profile/:id', userController.getUserOder )



module.exports = router;

