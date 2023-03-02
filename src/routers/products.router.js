const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.editProduct);

module.exports = router;