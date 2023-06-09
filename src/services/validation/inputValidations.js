const { idSchema, newProductSchema, newSaleSchema } = require('./schemas');
const productsModel = require('../../models/products.model');

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

const verificateProductIdExist = async (allProducts) => {
  const existentProducts = await Promise
      .all(allProducts.map((product) => productsModel.findById(product.productId)));
  return existentProducts.every((product) => product[0]);
};

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);
  if (!error) return { type: null, message: newSale };
  const someProductsSaleDontHaveProductId = newSale.some((product) => !product.productId);
  if (someProductsSaleDontHaveProductId) {
    return { type: 'INVALID_VALUE', message: '"productId" is required' };
  }
  const someProductSaleQuantityIsNegative = newSale.some((sale) => sale.quantity <= 0);
  if (someProductSaleQuantityIsNegative) {
    return { type: 'QUANTITY_MIN_ERROR', message: '"quantity" must be greater than or equal to 1' };
  }
  const someProductsSaleDontHaveQuantity = newSale.some((product) => !product.quantity);
  if (someProductsSaleDontHaveQuantity) {
    return { type: 'INVALID_VALUE', message: '"quantity" is required' };
  }
};

module.exports = {
  validateProductId,
  validateNewProduct,
  validateNewSale,
  verificateProductIdExist,
};
