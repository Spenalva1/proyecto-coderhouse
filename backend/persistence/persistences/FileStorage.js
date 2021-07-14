import fs from 'fs';

const route = (key) => `storage/${key}.txt`;

class FileStorage {

  constructor() {}

  async create(key, data) {
    const el = {
      ...data,
      id : Date.now()
    };
    try {
      const content = JSON.parse(await fs.promises.readFile(route(key)));
      content.push(el);

      await fs.promises.writeFile(
        route(key),
        JSON.stringify(content, null, '\t')
      );

      return el
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar.');
    }
  }

  async read(key, id = null) {
    try {
      const content = await fs.promises.readFile(route(key));
      const data = JSON.parse(content);

      if (id === null) {
        return data ? data : null;
      }
      const el = data?.find(el => el.id == id);
      return el ? el : null;

    } catch (error) {
      console.error(error);
      throw new Error('Error al leer.');
    }
  }

  async update(key, id, data) {
    try {
      const content = JSON.parse(await fs.promises.readFile(route(key)));
      const index = content.findIndex(el => el.id == id);
      if (index === -1) {
        return null;
      }
      content[index] = {
        ...content[index],
        ...data
      }

      await fs.promises.writeFile(
        route(key),
        JSON.stringify(content, null, '\t')
      );

      return content[index];
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar.');
    }
  }
  
  async delete(key, id) {
    try {
      const content = JSON.parse(await fs.promises.readFile(route(key)));
      const index = content.findIndex(el => el.id == id);
      if (index === -1) {
        return null;
      }
      const [el] = content.splice(index, 1);
      await fs.promises.writeFile(
        route(key),
        JSON.stringify(content, null, '\t')
      );

      return el;
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar.');
    }
  }
}

export default new FileStorage