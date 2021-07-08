export class Abstract {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.findAll({
      raw: true,
    });
  }

  getById(id) {
    return this.model.findByPk(id, {
      raw: true,
    });
  }

  create(data) {
    return this.model.create(data, {
      raw: true,
    });
  }

  updateById(id, data) {
    const result = this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });

    return result;
  }

  deleteById(id) {
    return this.model.destroy({
      where: { id },
    });
  }
  findAllByParams(params) {
    return this.model.findAll({
      raw: true,
      where: {
        ...params,
      },
    });
  }
  findOneByParams(params) {
    return this.model.findOne({
      raw: true,
      where: {
        ...params,
      },
    });
  }
  deleteByParams(params) {
    return this.model.destroy({
      where: {
        ...params,
      },
    });
  }
}
