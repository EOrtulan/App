module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales_products',
      [{
        sale_id: 1,
        product_id: 2,
        quantity: 2,
      }]);
  }
};