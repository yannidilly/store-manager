const { idSchema, newProductSchema } = require('./schemas');

const validateProductId = (id) => {
  const { error } = idSchema.validate(id);
  if (!error) return { type: null, message: '' };
  return { type: 'INVALID_VALUE', message: '"id" must to be a number' };
};

const validateNewProduct = (newProduct) => {
  const { error } = newProductSchema.validate(newProduct);
  if (!error) return { type: null, message: '' };
  if (!newProduct.name) return { type: 'NAME_IS_REQUIRED', message: '"name" is required' };
  return { type: 'NAME_LENGTH_ERROR', message: '"name" length must be at least 5 characters long' };
};

module.exports = {
  validateProductId,
  validateNewProduct,
};
