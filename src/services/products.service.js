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

const createProduct = async ({ name }) => {
  const error = validate.validateNewProduct({ name });
  if (error.type) return error;
  const newProduct = await productsModel.createProduct({ name });
  return { type: null, message: newProduct };
};

const editProduct = async (id, { name }) => {
  const realId = await validate.verificateProductIdExist([{ productId: id }]);
  if (!realId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const error = validate.validateNewProduct({ name });
  if (error.type) return error;
  const editedProduct = await productsModel.editProduct(id, { name });
  return { type: null, message: editedProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  editProduct,
};
