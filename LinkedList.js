class LinkedListNode {
  constructor(data) {
    this.next = null;
    this.previous = null;
    this.data = data;
  }
  toString() {
    return "A";
  }
}

class LinkedList {
  constructor() {
    this._first = null;
    this._last = null;
    this._size = 0;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size <= 0;
  }

  add(data) {
    return this.addLast(data);
  }

  addFirst(data) {
    const node = new LinkedListNode(data);
    if (this._first) {
      const temp = this._first;
      node.next = temp;
      temp.previous = node;
    } else {
      this._last = node;
    }
    this._first = node;
    this._size++;
    return node;
  }

  addLast(data) {
    const node = new LinkedListNode(data);
    if (this._last) {
      const temp = this._last;
      node.previous = temp;
      temp.next = node;
    } else {
      this._first = node;
    }
    this._last = node;
    this._size++;
    return node;
  }

  getFirst() {
    if (!this._first) {
      return null;
    }
    return this._first.data;
  }

  getLast() {
    if (!this._last) {
      return null;
    }
    return this._last.data;
  }

  get(index) {
    const node = this.getNode(index);
    if (node) {
      return node.data;
    }
    return null;
  }

  find(fn, index = false) {
    const lastIndex = this._size - 1;
    if (!this.isEmpty()) {
      let node = this._first;
      let i = 0;
      while (node) {
        const result = fn(node.data);
        if (result) {
          if (index) {
            return i;
          } else {
            return node.data;
          }
        } else {
          node = node.next;
          i++;
        }
      }
    }
    return index ? -1 : null;
  }

  findIndex(fn) {
    return this.find(fn, true);
  }

  getNode(index) {
    const lastIndex = this._size - 1;
    if (this.isEmpty() || index > lastIndex || index < 0) {
      return null;
    }
    if (index === 0) {
      return this._first;
    }
    if (index === lastIndex) {
      return this._last;
    }
    if (index <= this._size / 2) {
      let current = this._first;
      let i = 0;
      while (i < index) {
        current = current.next;
        i++;
      }
      return current;
    } else {
      let current = this._last;
      let i = lastIndex;
      while (i > index) {
        current = current.previous;
        i--;
      }
      return current;
    }
  }

  addOn(index, data) {
    if (!this.isEmpty()) {
      if (index == 0) {
        return this.addFirst(data);
      } else if (index === this._size - 1) {
        return this.addLast(data);
      } else {
        const target = this.getNode(index);
        if (target) {
          const node = new LinkedListNode(data);
          node.previous = target.previous;
          node.next = target;
          target.previous = node;
          node.previous.next = node;
          this._size++;
          return node;
        }
      }
    }
    return null;
  }

  replace(index, data) {
    const node = this.getNode(index);
    if (node) {
      node.data = data;
      return node;
    }
    return null;
  }

  indexOf(data) {
    if (!this.isEmpty()) {
      let node = this._first;
      let i = 0;
      while (node.next) {
        if (node.data === data) {
          return i;
        } else {
          node = node.next;
          i++;
        }
      }
    }
    return -1;
  }

  contains(data) {
    return this.indexOf(data) >= 0;
  }

  lastIndexOf(data) {
    if (!this.isEmpty()) {
      let node = this._last;
      let i = this._size - 1;
      while (node.previous) {
        if (node.data === data) {
          return i;
        } else {
          node = node.previous;
          i--;
        }
      }
    }
    return -1;
  }

  peekFirst() {
    return this._first.data;
  }

  peekLast() {
    return this._last.data;
  }

  peek() {
    return this.peekFirst();
  }

  poolFirst() {
    if (!this.isEmpty()) {
      const data = this.getFirst();
      this.removeFirst();
      return data;
    }
    return null;
  }

  pool() {
    return this.poolFirst();
  }

  poolLast() {
    if (!this.isEmpty()) {
      const data = this.getLast();
      this.removeLast();
      return data;
    }
    return null;
  }

  push(data) {
    this.addFirst(data);
  }

  pop() {
    return this.poolFirst();
  }

  removeFrom(index) {
    if (!this.isEmpty()) {
      if (index === 0) {
        return this.removeFirst();
      } else if (index === this._size - 1) {
        return this.removeLast();
      } else {
        const node = this.getNode(index);
        if (node) {
          node.previous.next = node.next;
          node.next.previous = node.previous;
          this._size--;
          return true;
        }
      }
    }
    return -1;
  }
  removeFirst() {
    if (!this.isEmpty()) {
      this._first = this._first.next;
      if (this._first) {
        this._first.previous = null;
      }
      this._size--;
      return true;
    }
    return false;
  }
  remove() {
    this.removeFirst();
  }

  removeLast() {
    if (!this.isEmpty()) {
      this._last = this._last.previous;
      if (this._last) {
        this._last.next = null;
      }
      this._size--;
      return true;
    }
    return false;
  }

  toString() {
    if (this.isEmpty()) {
      return "LL[]";
    } else {
      let result = "LL["; // StringBuilder
      let node = this._first;
      result += node.data + ", ";
      while (node.next) {
        node = node.next;
        result += node.data + ",";
      }
      result += "](" + this._size + ")";
      return result;
    }
  }
}

module.exports = LinkedList;
