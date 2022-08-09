const { products } = require('../database/models');

const getAllProducts = async (email) => {
  const AllProducts = await products.find({
    where: {
      email,
    },
  });

  return AllProducts;
};

module.exports = {
  getAllProducts,
};