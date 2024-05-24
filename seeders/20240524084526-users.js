'use strict';

/** @type {import('sequelize-cli').Migration} */

const data = require('../public/jsons/users.json')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
