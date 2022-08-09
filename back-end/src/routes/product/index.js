const { Router } = require('express');
const productController = require('../../controllers/product.controller');

const Routes = Router();

Routes.get('/', productController.getAll);

module.exports = Routes;