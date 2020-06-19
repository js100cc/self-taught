// Reference type can be nested.
// Deep copy is to recursively copy every property untill no reference property exist.
// Shallow copy is just an one-depth subset of deep copy without recursion.
// If you want to use a copy fearless without confliction, better implement a deep copy.
//
// Note
// 1. There is no implementation of deep copy for any reference type, because reference type has many subtype and can be nested with any depth.
// 2. When we talk about copy with shallow or deep, the semantic is for structural data type, like normal object or array. It's make no sense to shallow or deep copy a function or regexp or anything else.


// here is a simple case:
// 1. the structure is only nested object.
// 2. only data props, i.e. no accessor props.
const getType = v => ({}).toString.call(v).slice(8, -1);

const deepCopy = (target, source) => {
  for (const key of Object.keys(source)) {
    if (getType(source[key]) === 'Object') {  // deep copy
      target[key] = {};
      deepCopy(target[key], source[key]);
    } else {
      target[key] = source[key];              // shallow copy
    }
  }
};

const target = {};
const source = {
  a: {
    b: {
      c: {
        d: 1,
        e: 2
      }
    }
  }
};
deepCopy(target, source);
console.log(target);  // it's deep-copied
