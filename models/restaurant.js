'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {}
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      name_en: DataTypes.STRING,
      category: DataTypes.INTEGER,
      image: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      google_map: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      description: DataTypes.STRING
    },
    { sequelize, modelName: 'Restaurant' }
  )
  return Restaurant
}
