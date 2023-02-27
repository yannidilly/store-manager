const saleModel = require('../models/sales.model');
const validate = require('./validation/inputValidations');

const newSale = async (salesProducts) => {
  const error = validate.validateNewSale(salesProducts);
  if (error.type) return error;
  const allProductsIdExist = await validate.verificateProductIdExist(salesProducts);
  if (!allProductsIdExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const sale = await saleModel.newSale(salesProducts);
  return sale;
};

module.exports = {
  newSale,
};
