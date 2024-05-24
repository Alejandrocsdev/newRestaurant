'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurants', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Restaurants', 'userId')
  }
}
// onDelete: 'CASCADE': 當刪除引用表中的記錄時，自動刪除關聯表中的所有相關記錄。
// onUpdate: 'CASCADE': 當更新引用表中的(主鍵)時，自動更新關聯表中的(外鍵)。
// onDelete: 'RESTRICT': 當關聯表中存在相關記錄時，禁止刪除引用表中的記錄。
// onUpdate: 'RESTRICT': 當關聯表中存在相關記錄時，禁止更新引用表中的(主鍵)。
