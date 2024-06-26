const db = require('../models')

class Service {
  constructor(model, attributes, where) {
    this.model = model
    this.attributes = attributes
  }

  getAll(data) {
    return db[this.model].findAll({ attributes: this.attributes, where: data, raw: true })
  }

  getAndCountAll(offset, limit) {
    return db[this.model].findAndCountAll({ attributes: this.attributes, offset, limit, raw: true })
  }

  getById(id) {
    return db[this.model].findByPk(id, { attributes: this.attributes, raw: true })
  }

  getByData(data) {
    return db[this.model].findOne({ attributes: this.attributes, where: data, raw: true })
  }

  async getAllIds() {
    const allIds = await db[this.model].findAll({ attributes: ['id'], raw: true })
    return allIds.map((row) => row.id)
  }

  checkExist(data) {
    return db[this.model].count({ where: data })
  }

  create(body) {
    return db[this.model].create(body)
  }

  update(body, id) {
    return db[this.model].update(body, { where: { id } })
  }

  delete(id) {
    return db[this.model].destroy({ where: { id } })
  }
}

module.exports = Service
