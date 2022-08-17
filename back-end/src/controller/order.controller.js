const orderService = require('../services/order.service');

const createSale = async (req, res, next) => {
  try {
    const id = await orderService.createSale(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await orderService.getAllSales();
    return res.status(200).json({ sales });
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const sales = await orderService.getSaleById(req.params.id);
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const updateSaleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const result = await orderService.updateSaleStatus(id, status);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
    createSale,
    getAllSales,
    getSaleById,
    updateSaleStatus,
}; 