const { Router } = require('express');
const { 
  createSale, 
  getAllSales,
  getSaleById,
  updateSaleStatus,
 } = require('../../controller/order.controller');
const authToken = require('../../middlewares/token.validate');

const orderRouter = Router();

orderRouter.post('/', authToken, createSale);
orderRouter.get('/', getAllSales);
orderRouter.get('/:id', getSaleById);
orderRouter.put('/:id', updateSaleStatus);

module.exports = orderRouter;