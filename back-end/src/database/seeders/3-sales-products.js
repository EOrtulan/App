module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('salesProducts',
      [{
        sale_id: 1,
        product_id: 2,
        quantity: 2,
      }]);
  }
};