class Queue {
    constructor() {
      this._arr = [];
    }
    enqueue(item) {
      this._arr.push(item);
    }
    dequeue() {
      return this._arr.shift();
    }
    size() {
      return this._arr.length
    }
    all() {
      return this._arr;
    }
    enqueueReverse(item) {
      this._arr.unshift(item);
    }
  }
  
  module.exports = Queue