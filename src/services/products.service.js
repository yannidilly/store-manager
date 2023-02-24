const productsModel = require('../models/products.model');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Produto não encontrado' };
};

module.exports = {
  findAll,
  findById,
};
