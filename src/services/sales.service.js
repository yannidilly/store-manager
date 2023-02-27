const saleModel = require('../models/sales.model');
const validate = require('./validation/inputValidations');

const newSale = async (salesProducts) => {
  const error = validate.validateNewSale(salesProducts);
  if (error.type) return error;
  const anyProductsIdDontExist = await validate.verificateProductIdExist(salesProducts);
  if (anyProductsIdDontExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const sale = await saleModel.newSale(salesProducts);
  return { type: null, message: sale };
};

module.exports = {
  newSale,
};
