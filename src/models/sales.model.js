const connection = require('./connection');

const allSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id;`,
  );
  return sales;
};

const newSale = async (productsSale) => {
  const dateList = productsSale.map((_product) => '(NOW())').join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (date) VALUES ${dateList};`,
  );

  const arrayProductData = productsSale.map((product) => (Object.values(product).join(', ')));
  const stringProductData = arrayProductData
      .map((productData) => `(${productData}, ${insertId})`).join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (product_id, quantity, sale_id)
    VALUES ${stringProductData};`,
  );

  const response = {
    id: insertId,
    itemsSold: productsSale,
  };

  return response;
};

module.exports = {
  allSales,
  newSale,
};