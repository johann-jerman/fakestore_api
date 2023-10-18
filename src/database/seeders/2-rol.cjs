'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Rols', [
      {
        rol: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
