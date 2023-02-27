const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post('/', salesController.newSale);

module.exports = router;