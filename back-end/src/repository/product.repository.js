const { products } = require('../database/models');

const getAllProducts = async () => {
  const AllProducts = await products.findAll();

  return AllProducts;
};

module.exports = {
  getAllProducts,
};