class IProductDAO {
  constructor() {}

  async create(data) {
    throw new DaoException('falta implementar create()');
  }

  async findById(id) {
    throw new DaoException('falta implementar findById()');
  }

  async find(query = {}, sort = null) {
    throw new DaoException('falta implementar find()');
  }

  async findOne(query = {}) {
    throw new DaoException('falta implementar findOne()');
  }

  async update(id, toUpdate) {
    throw new DaoException('falta implementar update()');
  }

  async delete(query) {
    throw new DaoException('falta implementar delete()');
  }

  async deleteById(id) {
    throw new DaoException('falta implementar deleteById()');
  }
}

export default IProductDAO;
