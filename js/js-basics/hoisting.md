# 变量提升（hoisting）

## 简单定义

Hoisting **通常**是指 JS 可以让变量在 declaration 之前使用，其效果等同将变量声明提升到其所处作用域的顶部。

## ES5

这个概念在 ES6 之前就存在了，针对的是通过 `var` 和 `function` 声明的变量。

```js
var x;
console.log(x); // undefined, 未初始化的变量默认值是 undefined

console.log(a); // a, 不会报错, 因为变量提升了
b();            // b, 不会报错, 因为函数声明语句整个函数会提升
c();            // TypeError: c is not a function, 提升的是变量声明，c 的值是 undefined

var a = 'a';
function b() { console.log('b'); }
var c = function() { console.log('c'); };
```

这种效果跟其它大多数语言反差很大，因此人们专门为这种效果起了个名字，即所谓的变量提升。

这里我不打算重复介绍太多 ES6 之前的这种特性，这篇文章[JavaScript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) 有比较详细的说明。

## ES6

前面我有暗示（**通常** 和 **提升的是变量声明**），变量提升不是 ES5 的专利，ES6 也是存在的。

```js
const x = 1;
function f() {
  console.log(x); // ReferenceError
  const x = 2;
}
f();
```

假如没有提升，即变量声明和初始化都在后面，`console.log(x)` 应该沿着作用域链找到外部的 `x = 1` 并输出 `1`, 这是最合理的预期。

这里我也不打算重复介绍 ES6 的变量提升，这篇文章 [Temporal Dead Zone (TDZ) demystified](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified) 有详细介绍。

## 提升只是表象

前面我有提到**所谓的变量提升**, 它只是一种效果，或通俗化的称呼。

JS 引擎进入具有作用域的词法结构时，先解析，生成 lexical environment (LE)，再执行代码。词法环境是链式引用的，跟对象原型链类似，不管是 ES5 还是 ES6, 它都是下面这样 consult 一个变量的。

```js
// 这里都是伪代码

// 解析
LE struct: unfulfilled {
  var [variables]       ---------> undefined, real address
  function [variables]  ---------> real function address
  let [variables]       -- TDZ --> virtual variables address (TDZ)
  const [variables]     -- TDZ --> virtual variables address (TDZ)
  class [variables]     -- TDZ --> virtual variables address (TDZ)
  otherES6ImplicitDeclarations -- TDZ --> virtual variables address (TDZ)
  ...
  outerLE  -----> outerLE struct: fulfilled {
    // recursive untill global LE untill null
  }
}

// 执行
LE struct: fulfilled {
  var [variables]       ---------> initialization || undefined --> real address
  function [variables]  ---------> Not changed (real address)
  let [variables]       ---------> initialization || undefined --> real address
  const [variables]     ---------> initialization  --> real address
  class [variables]     ---------> initialization  --> real address
  otherES6ImplicitDeclarations ---------> initialization  --> real address
  ...
  outerLE  -----> outerLE struct: fulfilled {
    // recursive untill global LE untill null
  }
}
```

简言之，变量要想取值(初始阶段)要完成： `call stack --> heap --> LE[variable table] --> LE[variable address]` 的过程，`var` 和 `function` 声明的变量不管在 ES5 还是 ES6 中任何时候都不存在问题，但 ES6 新的声明语法阻断了这一过程，`LE[variable table] --> TDZ blocking --> LE[variable address]`，这种阻断效应要等到变量初始化完成才取消。

LE 放在 heap 加上一个基于引用的垃圾回收是 JS 实现词法作用域和闭包的方式，所谓的变量提升是其副产品，初期阶段 JS 并没有对这一副产品的效果加以限制，ES6 增加了 TDZ 的机制得以避免某些无意产生的 bug。

## 最佳实践

了解这些，是为了更好的避免写出糟糕的代码以及识别某些潜在的 bug。

一些针对性的编程规范有：

1. 优先使用 const，其语义是不会重新赋值。
2. 其次使用 let，其语义是会重新赋值，为了避免困惑，使用 let 声明的变量在将来必须重新赋值。
3. function/class 跟 const 和 let 地位相同，看具体情况使用。
4. 不要使用 var，var 的语义是向后兼容。
5. 先声明，再使用。
6. 就近声明。
7. 规范是死的，人是活的，实事求是永远错不了。
