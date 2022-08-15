const { Router } = require('express');
const { createSale, getAllSales } = require('../../controller/order.controller');

const orderRouter = Router();

orderRouter.post('/', createSale);
orderRouter.get('/', getAllSales);

module.exports = orderRouter; 