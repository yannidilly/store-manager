const connection = require('./connection');

const newSale = async (productsSale) => {
  const arrayProductData = productsSale.map((product) => (Object.values(product).join(', ')));
  const stringProductData = arrayProductData.map((productData) => `(${productData})`).join(', ');

  const [sale] = await connection.execute(
    `INSERT INTO StoreManager.sales (productId, quantity) VALUES ${stringProductData}`,
  );
  return sale;
};

module.exports = {
  newSale,
};