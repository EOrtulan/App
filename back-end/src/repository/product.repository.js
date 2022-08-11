const { products } = require('../database/models');

const getAll = async () => {
  const AllProducts = await products.findAll();

  return AllProducts;
};

module.exports = {
  getAll,
};