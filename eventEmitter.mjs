export class EventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    if (this.listeners?.[eventName]) {
      this.listeners[eventName].push(fn);
      return;
    }
    this.listeners = {...this.listeners, [eventName]: [fn]};
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    const fnIndex = this.listeners[eventName].indexOf(fn);
    if (fnIndex !== -1) {
      this.listeners[eventName].length > 1
        ? this.listeners[eventName].splice(fnIndex, 1)
        : delete this.listeners[eventName]
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn)
  }

  once(eventName, fn) {
    const cb = () => {
      fn();
      this.removeListener(eventName, cb);
    }
    this.addListener(eventName, cb)
  }

  emit(eventName, ...args) {
    this.listeners?.[eventName]?.forEach(fn => fn(...args));
  }

  listenerCount(eventName) {
    return this.listeners?.[eventName]?.length || 0;
  }

  rawListeners(eventName) {
    return this.listeners?.[eventName]?.length
      ? [...this.listeners?.[eventName]]
      : []
  }
}
