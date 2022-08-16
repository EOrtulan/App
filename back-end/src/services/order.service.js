const ErrorConstructor = require('../helpers/errorConstructor');
const orderRepository = require('../repository/order.repository');
const saleProductRepository = require('../repository/sale.product.repository');

const createSale = async (newSale) => {
  const saleId = await orderRepository.createSale(newSale);

  if (!saleId) throw ErrorConstructor(404, 'Products not created!');

  const { products } = newSale;

  const productsOfSale = products
    .map(({ productId, quantity }) => ({ productId, quantity, saleId }));

  const saleCreated = await saleProductRepository.create(productsOfSale);

  return saleCreated && saleId;
};

const getAllSales = async () => {
  const sales = await orderRepository.getAllSales();

  if (!sales) throw ErrorConstructor(404, 'Products not found!');

  return sales;
};

const getSaleById = async (id) => {
  const sale = await orderRepository.getSaleById(id);

  if (!sale) throw ErrorConstructor(404, 'Product not found!');

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
}; 