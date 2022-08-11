const ErrorConstructor = require('../helpers/erroConstructor');
const productRepository = require('../repository/product.repository');

const getAll = async () => {
  const products = await productRepository.getAll();

  if (!products) throw ErrorConstructor(404, 'Products not found!');

  return products;
};

module.exports = {
  getAll,
};