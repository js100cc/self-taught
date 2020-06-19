/*
 * 1. 循环和递归很多时候实现的是相同的功能，使用哪种看具体情况。
 * 2. 通常，递归没有那么直观和好理解，在主流使用循环的场景中，应使用循环（或数据结构，比如数组的 forEach 等）。
 * 3. 有些时候使用递归可能是必要的或唯一的方案。
 * 4. 递归是指函数调用自身，调用时通过改变参数状态来降级问题的复杂度。
 * 5. 当复杂度降低到足够时，应设置临界点。
 * 6. 递归很容易产生分支众多的代码执行路线，比如后面的 hanoi 是 2^n 量级，这也是递归有时很难直观理解的部分原因。(复杂的正则表达式也有类似的难理解的问题)。
 * 7. 为了增强理解的直观性，可以将递归看作树形结构(后面可以看到多递归调用)，每个递归调用是其一个节点，整个递归从临界点开始返回。代码执行路性不一定遍历整个树，满足终止条件时即按树形结构返回起点结束递归。
 * 8. 使用递归的关键，除了理解上面的部分，最核心的是三点：找出问题的自身相似性(可递归)，如何降级(如何递归)，确定临界点(递归终止条件)。操作上可以将问题降级到可直观理解的最小子集，或接近这个子集的范畴，从而确定这三个要素。
 * 9. 一旦确定，不论一个递归潜在的复杂度是多大，都可以简单的用一个函数来抽象它，并且我们可以预期这个函数能够完成工作。
 * 10. 现实中，问题是被处理的目标，很多问题在进化中学会了不告诉我们它是递归的，我们很多时候就信了，因此，知道递归的概念是不够的，我们还需要洞悉问题的能力。
 */


// 阶乘，1 * 2 * 3 * ... * n
function factorial(n) {
  return n < 1 ? 1 : n * factorial(n - 1);
}
console.log(factorial(5));  // 120

// 连加, 1 + 2 + 3 + ... + n
function seqSum(n) {
  return n < 1 ? 0 : n + seqSum(n - 1);
}
console.log(seqSum(5)); // 15

// 给一个数 n，生成 [1, 2, ..., n]。可以扩展到 start to end，或逆序， 参考 freecodecamp 相关test
function genArrByRecursion(n) {
  if (n < 1) {
    return [];
  } else {
    const arr = genArrByRecursion(n - 1);
    arr.push(n);
    return arr;
  }
}
console.log(genArrByRecursion(5));  // [1, 2, 3, 4, 5]

// Hanoi, 参考 Douglas Crockford Javascript The Good Parts
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


// 一个数要么加5要么乘3，新数重复此操作，得到无穷多数，形成一个集合。取集合中任意两个数，找出一种 start 到 end 的路径。
// 参考 eloquentjavascript.net
function pathForNumber(start, end, history) {
  if (start == end) {
    return history;
  } else if (start > end) {
    //console.log(history, 'too big');
    return null;
  } else {
    return pathForNumber(start + 5, end, `(${history} + 5)`) ||
      pathForNumber(start * 3, end, `(${history} * 3)`)
  }
}

console.log(pathForNumber(1, 24, '1'));


// 遍历元素
function* traverseDOM(el) {
  yield el;
  el = el.firstElementChild;
  while (el) {
    yield* traverseDOM(el);
    el = el.nextElementSibling;
  }
}
