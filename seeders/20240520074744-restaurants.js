'use strict';

/** @type {import('sequelize-cli').Migration} */

const data = require('../public/jsons/restaurants.json')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('restaurants', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurants', null)
  }
}
