const express = require('express');
const billController = require('../controllers/billController');

const router = express.Router();
// var auth = require('../services/authentication');
// var checkRole = require('../services/checkRole');

let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs=require("fs");
var uuid = require('uuid');


router.post('/generateReport', billController.generateReport);
router.post('/getPdf', billController.getPdf);
router.get('/getBills', billController.getBills);
router.delete('/delete/:id', billController.deleteBills);
router.get('/getProducts', billController.getProducts)
router.post('/addProducts', billController.addProducts)
//addProducts


module.exports = router;