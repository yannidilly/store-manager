const productsService = require('../services/products.service');
const { sucessStatus, successfullCreationStatus, mapStatusError } = require('../utils/mapStatus');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  return res.status(sucessStatus).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productId = Number(id);
  const { type, message } = await productsService.findById(productId);
  if (type) return res.status(mapStatusError(type)).json({ message });
  return res.status(sucessStatus).json(message);
};

const createProduct = async (req, res) => {
  const { type, message } = await productsService.createProduct(req.body);
  if (type) return res.status(mapStatusError(type)).json({ message });
  return res.status(successfullCreationStatus).json(message);
};

module.exports = {
  findAll,
  findById,
  createProduct,
};