import { EventEmitter } from "./eventEmitter.mjs";

export class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('async function execution');
    this.emit('begin');
    asyncFunc(...args);
    this.emit('end');
    console.timeEnd('async function execution');
  }
}
