const camelize = require('camelize');
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

const createProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return { id: insertId, name };
};

const editProduct = async (id, { name }) => {
  await connection.execute(
    `UPDATE StoreManager.products SET name = '${name}' WHERE id = '${id}'`,
  );
  return { id, name };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  editProduct,
};
