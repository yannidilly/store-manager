const salesService = require('../services/sales.service');
const { sucessStatus, mapStatusError } = require('../utils/mapStatus');

const allSales = async (_req, res) => {
  const { message } = await salesService.allSales();
  return res.status(sucessStatus.sucess).json(message);
};

const newSale = async (req, res) => {
  const salesProducts = req.body;
  const { type, message } = await salesService.newSale(salesProducts);
  if (type) return res.status(mapStatusError(type)).json({ message });
  return res.status(sucessStatus.created).json(message);
};

module.exports = {
  allSales,
  newSale,
};
