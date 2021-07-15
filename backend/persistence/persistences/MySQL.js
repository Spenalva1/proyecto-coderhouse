import {default as Knex} from 'knex';

class MySQL {

  constructor() {
    this.knex = Knex({
      client: 'mysql',
      connection: {
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
      },
    });
  }

  async create(key, data) {
    const el = {...data}
    if (key === 'carts') {
      el.product = el.product.id;
    }
    try {
      const id = await this.knex(key).insert(el);
      return {
        ...el,
        id: id[0]
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar.', error);
    }
  }

  async read(key, id = null) {
    try {
      let data;

      if (id === null) {
        if (key !== 'carts') {
          data = await this.knex.select().table(key);
        } else {
          data = await this.knex.select().table('carts').leftJoin('products', 'products.id', 'carts.product').options({nestTables: true});
          data = data?.map(data => ({
            ...data.carts,
            product: data.products
          }));          
        }
        return data?.length ? data : [];
      }

      if (key !== 'carts') {
        data = await this.knex(key).where('id', id);
      } else {
        data = await this.knex('carts').where('carts.id', id).leftJoin('products', 'products.id', 'carts.product').options({nestTables: true});
        data = data?.map(data => ({
          ...data.carts,
          product: data.products
        }));          
      }
      return data[0] ? data[0] : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error al leer.', error);
    }
  }

  async update(key, id, data) {
    try {
      if (
        await this.knex(key)
          .where('id', id)
          .update({ ...data })
      ) {
        return {
          ...data,
          id,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar.', error);
    }
  }
  
  async delete(key, id) {
    try {
      let data;
      if (key !== 'carts') {
        data = await this.knex(key).where('id', id);
      } else {
        data = await this.knex('carts').where('carts.id', id).leftJoin('products', 'products.id', 'carts.product').options({nestTables: true});
        data = data?.map(data => ({
          ...data.carts,
          product: data.products
        }));          
      }
      if (data && await this.knex(key).where('id', id).del()) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al borrar.', error);
    }
  }
}

export default new MySQL();