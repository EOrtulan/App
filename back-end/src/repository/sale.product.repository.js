const { salesProducts } = require('../database/models');

const create = async (productsOfSale) => {
  const saleCreated = await salesProducts.bulkCreate(productsOfSale);

  return saleCreated;
};

module.exports = {
  create,
}; 