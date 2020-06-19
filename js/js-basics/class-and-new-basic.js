// What new do ?

function F(...args) {}
const obj = new F(...args);

// It's core is like this
function fakeNew(F, ...args) {
  const obj = Object.create(F.prototype); // prototype inheritance
  F.call(obj, ...args);                   // mixin
  return obj;                             // prototype + mixin is how js emulate class-based paradigm
}

// A more complete version may like this
function fakeNew2(F, ...args) {
  let obj = null;
  try {
    obj = Object.create(F.prototype);
  } catch (_err) {
    obj = Object.create(Object.prototype, {
      constructor: {
        value: F,
        writable: true,
        enumerable: false,
        configurable: true
      }
    });
  }

  let returnValue = F(...args);
  if (returnValue && typeof returnValue === 'object') {
    return returnValue;
  }

  F.call(obj, ...args);
  return obj;
}


// What about class ?
// It's just syntax sugar for constructor function

class F {
  constructor() {
    // mixin
  }

  // list F.prototype methods
  methodOne() {
  }

  methodTwo() {

  }

  // ...

  static staticMethod() {
    // the same as F.staticMethod = function() {}
  }
}

// Before ES6, it's tedious to do emulation of class and class inheritance
function superClass(...args) {}
function subClass(...args) {
  superClass.call(this, ...args);
}
subClass.prototype = Object.create(superClass.prototype);
subClass.prototype.constructor = subClass;

// With ES6 class syntax
class superClass {}
class subClass extends superClass {
  constructor() {
    // constructor is optional except we need to handle subclass's mixin and closure
    super();
  }
}

// That is, before ES6, we need to handle prototype + mixin specifically
// With ES6, the syntax is much easier, and give class more semantics although it's still just function
// There are more about ES6 class syntax, above just shows the principle
