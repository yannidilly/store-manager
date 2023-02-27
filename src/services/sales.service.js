const saleModel = require('../models/sales.model');
const validate = require('./validation/inputValidations');

const allSales = async () => {
  const sales = await saleModel.allSales();
  return { type: null, message: sales };
};

const newSale = async (salesProducts) => {
  const error = validate.validateNewSale(salesProducts);
  if (error.type) return error;
  const allProductsIdExist = await validate.verificateProductIdExist(salesProducts);
  if (!allProductsIdExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const sale = await saleModel.newSale(salesProducts);
  return { type: null, message: sale };
};

module.exports = {
  allSales,
  newSale,
};
