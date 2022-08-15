const productController = require('../services/product.service');

const getAll = async (_req, res, next) => {
  try {
    const allProducts = await productController.getAll();
    return res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
}; 