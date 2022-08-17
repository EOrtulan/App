const { Router } = require('express');
const { 
  createSale, 
  getAllSales,
  getSaleById,
 } = require('../../controller/order.controller');
const authToken = require('../../middlewares/token.validate');

const orderRouter = Router();

orderRouter.post('/', authToken, createSale);
orderRouter.get('/', getAllSales);
orderRouter.get('/:id', getSaleById);

module.exports = orderRouter; 