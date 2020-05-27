# Javascript 递归（recursion）

## 什么是递归

wikipedia.org 对于 recursion 的描述：

In computer science, recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.

这是从解决问题的思想层面来描述递归，我们可以使用递归来解决自相似问题。

从技术层面来讲，Javascript recursion 是指函数调用自身，并能满足终止条件。

一个简单的示例（本文约定示例不做参数检测）：

```js
// 计算阶乘，即 n! = 1 * 2 * 3 * ... * n， 规定 0! = 1
function factorial(n) {
  return n == 0 ? 1 : n * factorial(n - 1);
}

factorial(5); // 120
```

没有终止条件的函数自身调用会导致 callstack overflow：

```js
function someFunc(...someArgs) {
  // some statements, no return or termination
  someFunc(...someOtherArgs);
}
```

虽然 JS 作用域相关的数据是放在 heap 当中的 lexical environment 底层数据结构当中，但每一个函数调用都至少有一个 return point 的地址数据是存放在 callstack frame 当中的，不能终止的自身调用会导致 callstack 内存理论上趋近无穷大，现实中达到某个临界点会导致程序崩溃。

## 循环和递归

上面用递归实现的 factorial 可以用循环实现：

```js
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i += 1) {
    result *= i;
  }
  return result;
}
```

循环和递归具有某种程度的相似性，它们都有终止条件，在条件达成之前它们都重复某些操作。

其实，这种相似性来自于循环是递归的子集这一事实。也就是说，任何用循环实现的代码，我们都可以用递归来模拟。

```js
// 递归的方式模拟 loop
function fakeLoop(loopInitData) {
  if (loopConditionTest()) {
    loopBodyOperation();
    fakeLoop(increment(loopInitData));
  }
  return;
}

// 一个具体的对比
// loop
let result = 0;
for (let i = 0; i < 100; i += 1) {
  result += i;
}

// recursion，其实这不是一个好的递归，这里只是用来模拟 loop
function sum(result, start, end, step) {
  if (start <= end) {
    result += start;
    return sum(result, start + step, end, step);
  }
  return result;
}
sum(0, 0, 100, 1);

// 更好的实现是 const sum = (init, n) => n == init ? n : n + sum(n - 1);
```

这其实很好理解，我们只需要把相关数据放入参数保存，条件测试放入函数体，而函数体本身可以看作 loop body。有些函数式编程语言比如 lisp，就没有循环语句。

循环作为递归的子集，使得我们任何时候都可以用递归来替代用循环解决问题的方式。比如上面的 factorial 和 sum，但 factorial 是好理解的，而 sum 看起来很别扭。

这里就引申出循环和递归的职能划分问题，或者更深层次的解决问题的思想：

1. 循环是用来解决单一问题而进行的重复(处理单一问题的操作上的重复性)。
2. 递归是用来解决自相似问题而进行的重复(重复处理一类问题)。

为了说明这一点，引用 Douglas Crockford Javascript The Good Parts 中的一个示例：

```js
// walk the DOM
function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {  // 循环遍历同一层级每个节点
    walk(node, func); // 递归处理包含(或不包含)子结点的节点。
    node = node.nextSibling.
  }
}
```

接下来，让我们脱离循环，回到递归本身。

## 两个 recursion 示例拓宽认知

还是 good parts 的示例，CLI 版 Tower of Hanoi 解决方案：

```js
function hanoi(n, x, y, z) {
  if (n > 0) {
    hanoi(n - 1, x, z, y);
    move(n, x, y);
    hanoi(n - 1, z, y, x);
  }
  function move(n, x, y) {
    console.log(`Move ${n} from ${x} to ${y}`);
  }
}

hanoi(3, 'A', 'B', 'C');  // 得到 hanoi 的 CLI 方案
```

要想把所有的 N 个饼都放入到目标位置，我们就需要想办法先把上面的 N - 1 个饼放入第三点，然后把最底部的饼放入目标点，最后将已放入第三点的 N - 1 个饼放入目标点，然后自然就出现了递归的问题。

另外一个示例是，一个数要么加5要么乘3，新数重复此操作，得到无穷多数，形成一个集合。取集合中任意两个数，找出一种 start 到 end 的路径。

```js
// 此例来自 eloquentjavascript.net
function pathForNumber(start, end, history) {
  if (start == end) {
    return history;
  } else if (start > end) {
    return null;
  } else {
    return pathForNumber(start + 5, end, `(${history} + 5)`) || 
      pathForNumber(start * 3, end, `(${history} * 3)`)
  }
}

console.log(pathForNumber(1, 24, '1'));
```

这两个示例是多递归调用，理解多递归调用是我们理解递归全貌的关键。因为它让我们从一条线扩展到了一个面。

## 嵌套和递归

循环是递归的子集，而递归是嵌套的子集。

任何嵌套形式，都可以映射成树形结构来感知。比如 HTML -> DOM tree，UNIX filesystem hierarchy -> tree。

一些通常会被忽视的嵌套场景：

1. 一个表达式，可以描述为由更小的表达式组成的代码，直到不能细分。
2. JS 源码可以描述为嵌套式的词法结构组成的代码，直到不再嵌套。

很多这类嵌套，都可以形象的看作树形结构。

在 JS 中，嵌套的一个重要场景是闭包，闭包是唯一的针对 lexical environment 形成的树形结构(虽然任意单一时间点，是链式的)进行处理的接口。但对于更普遍的场景，递归是一般性解决方案。

将递归看作树形结构，是为了形象和整体性的感知递归的代码流。不然，对于稍复杂的问题，递归的代码执行分支的数量级，将很快超出我们的感知，比如 hanoi 的数据量在 2^n 次方。

也就是说，不管问题多么复杂，只要是递归问题，我们就可以将它看作一棵树，每个分支都有自相似性，直到树枝末端不再分岔，函数将从那里返回。

## 使用递归

并不是所有问题都需要或能够用递归解决。它是用来处理自相似问题的。

理解了上面部分，在遇到自相似问题时，实现递归的思路是：

1. 降级，简化问题得到简单解
2. 自身调用替换简单解

递归更像是数学证明，具有终止条件的自相似问题被证明就是可以用函数自身调用的方式解决，我们定义一个函数时可以预期它能完成任务，我们唯一要做的就是每次调用时如何对数据进行处理。

其实，真正困难的是，我们很多时候遇到问题时不能意识到它具有自相似性，或者它的自相似性隐藏在众多干扰因素之中，这也是为什么有人说发现问题远比解决问题重要。
