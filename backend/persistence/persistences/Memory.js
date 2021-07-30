class Memory {

  constructor() {
    this.state = {}
  }

  create(key, data) {
    const el = {
      ...data,
      id : Date.now()
    };
    if (this.state[key] === undefined) {
      this.state[key] = [el];
    } else {
      this.state[key].push(el);
    }
    return el;
  }

  read(key, id = null) {
    if (id === null) {
      return this.state[key] ? this.state[key] : null;
    }
    const el = this.state[key]?.find(el => el.id == id);
    return el ? el : null;
  }

  update(key, id, data) {
    const index = this.state[key]?.findIndex(el => el.id == id);
    if (index === -1) {
      return null;
    }
    this.state[key][index] = {
      ...this.state[key][index],
      ...data
    }
    return this.state[key][index];
  }
  
  delete(key, id) {
    const index = this.state[key]?.findIndex(el => el.id == id);
    if (index === undefined || index === -1) {
      return null;
    }
    const [el] = this.state[key].splice(index, 1);
    return el;
  }
}

export default new Memory();