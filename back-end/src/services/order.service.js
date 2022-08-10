const { checkout } = require('../repository/order.repository');

const createSale = async (newSale) => {
  const saleId = await checkout(newSale);
  return saleId;
}

module.exports = {
  createSale,
}