const orderService = require('../services/order.service');

const createSale = async (req, res, next) => {
  try {
    const allSales = await orderService.createSale(req.body);
        return res.status(201).json(allSales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createSale,
};