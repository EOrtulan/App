const { sales } = require('../database/models');

const checkout = async (newSale) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = newSale;
  const saleDate = new Date();
  const status = 'pendente';
  const result = await sales.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  });

  const { id } = result.dataValues;
  return id;
};

module.exports = {
  checkout,
};