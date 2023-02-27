const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.allSales);

router.post('/', salesController.newSale);

module.exports = router;