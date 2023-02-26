const { allProducts, productId1 } = require('./products');

const findAll = {
  type: null,
  message: allProducts,
}

const findById = {
  productNotFound: {
    type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  },
  sucess: {
    type: null,
    message: productId1,
  },
}

module.exports = {
  findAll,
  findById,
};