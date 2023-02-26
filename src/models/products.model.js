const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const createProduct = async (newProduct) => {
  const columns = Object.keys(snakeize(newProduct)).join(', ');
  const placeholder = Object.keys(newProduct).map((_key) => '?').join(', ');

  const [{ newProductId, name }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholder})`,
    [...Object.values(newProduct)],
  );

  return { id: newProductId, name };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
