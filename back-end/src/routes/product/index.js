const { Router } = require('express');
const productController = require('../../controller/product.controller');

const Routes = Router();

Routes.get('/', productController.getAll);

module.exports = Routes; 