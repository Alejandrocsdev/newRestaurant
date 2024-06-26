'use strict';

/** @type {import('sequelize-cli').Migration} */

const data = require('../public/jsons/restaurants.json')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
}
