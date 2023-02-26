const saleModel = require('../models/sales.model');

const newSale = async (salesProducts) => {
  // inputValidation
  // productIdValidation
  const sale = await saleModel.newSale(salesProducts);
  return sale;
};

module.exports = {
  newSale,
};
