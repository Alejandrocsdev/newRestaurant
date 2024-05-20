const db = require('../models')

class Service {
  constructor(model, attributes) {
    this.model = model
    this.attributes = attributes
  }

  getAll() {
    return db[this.model].findAll({ attributes: this.attributes, raw: true })
  }

  getById(id) {
    return db[this.model].findByPk(id, { attributes: this.attributes, raw: true })
  }

  create(body) {
    return db[this.model].create(body)
  }

  update(body, id) {
    return db[this.model].update(body, { where: { id }})
  }
}

module.exports = Service