const productsService = require('../services/products.service');

const findAll = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if ()
};