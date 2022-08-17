const { products } = require('../database/models');

const getAll = async () => {
  const AllProducts = await products.findAll();

  return AllProducts;
};

const getById = async (id) => {
  const AllProducts = await products.findOne({
    where: { id },
  });

  return AllProducts;
};

module.exports = {
  getAll,
  getById,
}; 