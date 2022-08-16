const { Router } = require('express');
const { 
  createSale, 
  getAllSales,
  getSaleById,
 } = require('../../controller/order.controller');

const orderRouter = Router();

orderRouter.post('/', createSale);
orderRouter.get('/', getAllSales);
orderRouter.get('/:id', getSaleById);

module.exports = orderRouter; 