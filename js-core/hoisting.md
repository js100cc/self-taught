# 变量提升（hoisting）

变量提升，是对一种效果的描述性概念。

```js
// 效果看上去就跟 a 在当前作用域顶部声明一样
console.log(a); // undefined, 即使 'use strict' 也不会报错
var a = 10;


function average(...args) {
  return sum(...args) / args.length;
}

// sum 提升了
average(1, 2, 3);

function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}
```

这篇文章[JavaScript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) 有比较详细的说明。

本文不打算过多的对它进行描述，因为任何关于它的文章都在作描述，但我几乎没有看到任何人能更深入的解释它。

## 为何会 hoisting

Javascript 在进入具有作用域的某个词法结构执行代码之前，会先解析词法结构生成词法环境，lexical environment 是 ECMAScript 定义的抽象数据类型(由具体的 implementation 生成底层数据结构)，了解它对于深入理解很多概念都很有用（作用域，作用域链，闭包等等抽象概念都可以从数据结构的角度来理解）。

它的某些部分，我们可以简单的看作 identifier 表 --> address 表的映射结构，代码执行前，identifier 表就生成了，映射关系的建立要根据具体情况，ES5(var, function) 会建立，ES6(let, const) 临时的 TDZ (代码执行到声明位置时建立)。

变量的 consult 要根据 lexical environment chain 和映射结构进行，对于 var 和 function 声明的变量在代码执行前就已经具备了成功 consult 的条件，因此就有了 hoisting 的效果。

关于 lexical environment，可以简单查看 ECMAScript specification 相关章节（ES2019 第8章）。

## 避免使用 hoisting

Hoisting 本质上来讲是 JS 当初实现闭包的附属品，并且当初语言设计时没有对它加以限制。ES6 出于向后兼容的考虑，保留了 var 和 function 的这个特性，但提出了新的方式，let 和 const。

好的编程规范通常建议：

1. 不使用 var
2. 先声明，再使用

虽然如此，建议是死板的，真正理解建议背后的考量才是最重要的，永远正确的建议是，实事求是，因地制宜。
