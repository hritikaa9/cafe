const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', productController.addProduct);

router.get('/get',productController.getProduct);

router.get('/count',productController.productCount);

router.get('/getByCategory/:id', productController.getProductByCategory);
router.get('/getById/:id', productController.getProductById);

router.put('/update/:id', productController.updateProduct)

router.delete('/delete/:id', productController.deleteProduct)

// router.get('/updateC', auth.authenticateToken, categoryController.updateCategory);

module.exports = router;