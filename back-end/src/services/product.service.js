const ErrorConstructor = require('../helpers/erroConstructor');
const productRepository = require('../repository/product.repository');

const getAllProducts = async () => {
  const products = await productRepository.getAllProducts();

  if (!products) throw ErrorConstructor(404, 'Products not found!');

  return products;
};

module.exports = {
  getAllProducts,
};