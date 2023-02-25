const productsService = require('../services/products.service');
const { sucessStatus, mapStatusError } = require('../utils/mapStatus');

const findAll = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if (type) return res.status(mapStatusError(type)).json(message);
  return res.status(sucessStatus).json(message);
};

const findById = async (req, res) => {
  const id = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(mapStatusError(type)).json(message);
  return res.status(sucessStatus).json(message);
};

module.exports = {
  findAll,
  findById,
};