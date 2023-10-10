const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', categoryController.addCategory);

router.get('/get', categoryController.getCategory);

router.get('/update', categoryController.updateCategory);

router.delete('/delete/:id', categoryController.deleteCategory)

module.exports = router;