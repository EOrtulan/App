const orderService = require('../services/order.service');

const createSale = async (req, res, next) => {
  try {
    const saleId = await orderService.createSale(req.body);
        return res.status(201).json({ saleId });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createSale,
};