const { salesProducts } = require('../database/models');

const create = async (productsOfSale) => {
  const saleCreated = await salesProducts.bulkCreate(productsOfSale);

  return saleCreated;
};

const getByIds = async (id) => {
  const saleCreated = await salesProducts.findAll({
    where: { saleId: id },
  });

  return saleCreated;
};

module.exports = {
  create,
  getByIds,
}; 