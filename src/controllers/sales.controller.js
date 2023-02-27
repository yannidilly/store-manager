const salesService = require('../services/sales.service');
const { sucessStatus, mapStatusError } = require('../utils/mapStatus');

const findAll = async (_req, res) => {
  const { message } = await salesService.findAll();
  return res.status(sucessStatus.sucess).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const { type, message } = await salesService.findById(numberId);
  if (type) return res.status(mapStatusError(type)).json({ message });
  return res.status(sucessStatus.sucess).json(message);
};

const newSale = async (req, res) => {
  const salesProducts = req.body;
  const { type, message } = await salesService.newSale(salesProducts);
  if (type) return res.status(mapStatusError(type)).json({ message });
  return res.status(sucessStatus.created).json(message);
};

module.exports = {
  findAll,
  findById,
  newSale,
};
