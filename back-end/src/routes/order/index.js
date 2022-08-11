const { Router } = require('express');
const { createSale } = require('../../controllers/order.controller');

const orderRouter = Router();

orderRouter.post('/', createSale);

module.exports = orderRouter;