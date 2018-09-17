const HashMap = require("./HashMap");
/**
 * Implement a cache O(1) the is able to hold X items.
 */
class LRUNode {
  constructor(key, data) {
    this.next = null;
    this.previous = null;
    this.data = data;
    this.key = key;
  }
}

class Cache {
  constructor(maxSize = 100) {
    this.map = new HashMap();
    this.maxSize = maxSize;
    this.lru = {
      first: null,
      last: null
    };
  }
  put(key, value) {
    const node = new LRUNode(key, value);
    this.map.put(key, node);
    if (this.lru.last && this.map.size() > this.maxSize) {
      const last = this.lru.last;
      this.lru.last = last.previous;
      this.lru.last.next = null;
      this.map.remove(last.key);
    }
    if (this.lru.first) {
      const temp = this.lru.first;
      node.next = temp;
      temp.previous = node;
    } else {
      this.lru.last = node;
    }
    this.lru.first = node;
  }
  get(key) {
    const node = this.map.get(key);
    if (!node) {
      return null;
    }
    if (node !== this.lru.first) {
      if (this.lru.last === node) {
        this.lru.last = node.previous;
      }
      if (node.next) {
        node.next.previous = node.previous;
      }
      if (node.previous) {
        node.previous.next = node.next;
      }
      node.previous = null;
      const temp = this.lru.first;
      this.lru.first = node;
      node.next = temp;
    }
    // Return the node data.
    return node.data;
  }
  size() {
    return this.map.size();
  }
}

module.exports = Cache;
/*
cache = new Cache(5);
cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
cache.put("D", 4);
cache.put("E", 5);
cache.put("F", 6);
console.log(cache.size(), cache.size() === 5);
cache.get("B");
cache.put("G", 7);
console.log(cache.get("B"), cache.get("B") === 2);
console.log(cache.get("C"), cache.get("C") === null);
// console.log(cache);
cache.put("H", 8);
cache.put("I", 9);
cache.put("J", 10);
console.log(cache.size(), cache.size() === 5);
node = cache.lru.first;
console.log(node.key);
while (node.next) {
  node = node.next;
  console.log(node.key);
}
cache.get("B");
cache.get("A");
console.log("@@@@@@@@@@@@@");
node = cache.lru.first;
console.log(node.key);
while (node.next) {
  node = node.next;
  console.log(node.key);
}
*/
