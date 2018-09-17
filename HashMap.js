const LinkedList = require("./LinkedList");
function hash(value) {
  //return value.charCodeAt(0);
  let hash = 0,
    i,
    chr;
  if (value.length === 0) return hash;
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

class HashMapNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashMap {
  constructor() {
    this.data = {};
    this._size = 0;
  }
  put(key, value) {
    const hashKey = hash(key);
    if (!this.data[hashKey]) {
      this.data[hashKey] = new LinkedList();
    }
    const list = this.data[hashKey];
    const node = list.find(node => {
      return node.key === key;
    });
    if (node) {
      node.value = value;
    } else {
      list.add(new HashMapNode(key, value));
      this._size++;
    }
  }

  get(key) {
    const hashKey = hash(key);
    if (this.data[hashKey]) {
      const list = this.data[hashKey];
      const node = list.find(node => {
        return node.key === key;
      });
      if (node) {
        return node.value;
      }
    }
    return null;
  }

  remove(key) {
    const hashKey = hash(key);
    if (this.data[hashKey]) {
      const list = this.data[hashKey];
      const index = list.findIndex(node => {
        return node.key === key;
      });
      if (index >= 0) {
        list.removeFrom(index);
        this._size--;
        if (list.size() === 0) {
          delete this.data[hashKey];
        }
        return true;
      }
    }
    return false;
  }

  containsKey(key) {
    const hashKey = hash(key);
    if (this.data[hashKey]) {
      const list = this.data[hashKey];
      const node = list.find(node => {
        return node.key === key;
      });
      return node !== null;
    }
    return false;
  }

  containsValue(value) {
    return this.getKeyOfValue(value) !== null;
  }

  getKeyOfValue(value) {
    for (let key in this.data) {
      const list = this.data[key];
      const node = list.find(node => {
        return node.value === value;
      });
      if (node) {
        return node.key;
      }
    }
    return null;
  }

  isEmpty() {
    return this._size() <= 0;
  }
  size() {
    return this._size;
  }
}

module.exports = HashMap;
