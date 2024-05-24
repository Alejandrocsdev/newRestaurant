'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      // hasOne
      // belongsTo
      // hasMany
      // belongsToMany
      // Restaurant.belongsTo(models.User, { foreignKey: 'userId' })
      Restaurant.belongsTo(models.User)
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      name_en: DataTypes.STRING,
      category: DataTypes.STRING,
      image: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      google_map: DataTypes.STRING,
      rating: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { sequelize, modelName: 'Restaurant' }
  )
  return Restaurant
}
