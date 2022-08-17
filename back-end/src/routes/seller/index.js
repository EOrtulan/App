const { Router } = require('express');
const userController = require('../../controller/user.controller');

const sellerRouter = Router();

sellerRouter.get('/', userController.getSeller);
sellerRouter.get('/:id/orders', userController.getSellerOrders);

module.exports = sellerRouter;
