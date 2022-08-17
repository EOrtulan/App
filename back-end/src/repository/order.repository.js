const { sales } = require('../database/models');

const createSale = async (newSale) => {
  const { 
    userId, totalPrice, deliveryAddress, deliveryNumber, products, 
  } = newSale;

  const saleDate = new Date();
  const status = 'Pendente';
  const result = await sales.create({
    userId,
    sellerId: 2,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
    products,
  });

  const { id } = result.dataValues;
  return id;
};

const getAllSales = async () => {
  const result = await sales.findAll();

  return result;
};

const getSaleById = async (id) => {
  const result = await sales.findOne({
    where: { id },
  });

  return result;
};

const getSellerOrders = async (id) => {
  const orders = await sales.findAll({
    where: {
      sellerId: id,
    },
  });

  return orders;
}

const updateSaleStatus = async (id, status) => {
  const result = await sales.update({ status }, { where: { id } });

  return result;
}

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  getSellerOrders,
  updateSaleStatus,
}; 