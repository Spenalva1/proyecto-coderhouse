import fs from 'fs';

export default class FileStorage {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(data) {
    try {
      await fs.promises.writeFile(
        this.ruta,
        JSON.stringify(data, null, '\t')
      );
    } catch (error) {
      throw new Error('Error al guardar.');
    }
  }

  async read() {
    try {
      const content = await fs.promises.readFile(this.ruta);
      const data = JSON.parse(content);
      return data;
    } catch (error) {
      return [];
    }
  }
}