'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 1,
        seller_id: 2,
        total_price: 15.00,
        delivery_address: 'Rua do teste',
        delivery_number: '17',
        sale_date: new Date('2022-08-10T17:25:00.000Z'),
        status: 'Pendente',
      }]);
  }
}