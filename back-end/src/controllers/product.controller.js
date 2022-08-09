const { getAllProducts } = require('../services/product.service');

const getAll = async (_req, res, next) => {
  try {
    const allProducts = await getAllProducts();
    return res.status(200).send(allProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};