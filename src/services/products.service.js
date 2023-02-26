const productsModel = require('../models/products.model');
const validate = require('./validation/inputValidations');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validate.validateProductId(id);
  if (error.type) return error;

  const product = await productsModel.findById(id);

  if (product[0]) return { type: null, message: product[0] };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createProduct = async (newProduct) => {
  const newProductCreated = await productsModel.createProduct(newProduct);
  return { type: null, message: newProductCreated };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
