class PersistenceFactory {
  constructor() { }

  getPersistence(type) {
      try {
          return import(`./persistences/${type}.js`);
      } catch (error) {
          console.log('No se encontro el tipo de persistencia:', type, error);
      }
  }
}

export default new PersistenceFactory();