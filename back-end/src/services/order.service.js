const ErrorConstructor = require('../helpers/errorConstructor');
const orderRepository = require('../repository/order.repository');
const saleProductRepository = require('../repository/sale.product.repository');
const productRepository = require('../repository/product.repository');

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
  const productsIds = await saleProductRepository.getByIds(id);
  const arr = productsIds
    .map((item) => ({ productId: item.dataValues.productId, quantity: item.dataValues.quantity }));
  if (!sale) throw ErrorConstructor(404, 'Product not found!');
  const productsArr = arr
  .map(async (item) => productRepository.getById(item.productId));
  const saga = await Promise.all(productsArr);
  const newProducts = saga.map((item) => (item.dataValues));
  const products = newProducts.map((item, i) => {
    const novo = {
      ...item,
      quantity: arr[i].quantity,
    };
    return novo;
  });
  return { ...sale.dataValues, products };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
}; 