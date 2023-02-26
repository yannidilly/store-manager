const connection = require('./connection');

const newSale = async (productsSale) => {
  const arrayProductData = productsSale.map((product) => (Object.values(product).join(', ')));
  const stringProductData = arrayProductData.map((productData) => `(${productData})`).join(', ');

  const [productSale] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (productId, quantity) VALUES ${stringProductData};
    INSERT INTO StoreManager.sales (date) VALUE (NOW());`,
  );
  return productSale;
};

module.exports = {
  newSale,
};