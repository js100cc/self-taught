# 实现一个简单的 Nodejs http 服务器

Nodejs 服务器直接由 JS 代码实现。

Nodejs 官网的第一篇 Guide，[How do I start with Node.js after I installed it?](https://nodejs.org/en/docs/guides/getting-started-guide/) 有现成代码示例。

## 安装 Nodejs

Nodejs 最初基于 Unix 开发，不久就成功迁移到 Windows 和其它平台。

> Windows is important, just like PHP.
>
> -- <cite>Ryan Dahl</cite>, Feb.22,2011, San Francsico, CA, An introduction to Node.js with Ryan Dahl.
> 视频 [Introduction to Node.js with Ryan Dahl](https://www.youtube.com/watch?v=jo_B4LTHi3I&t=3387s)

建议根据自己的 OS 去 [Nodejs官网](https://nodejs.org) 查看安装方式。

我用的 Arch Linux，pacman 设置国内源的情况下 `sudo pacman -S nodejs`，简单快捷。

## 代码实现

为了方便后续说明，我稍微改写了一下原代码。

```javascript
// app.js
const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer();

server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Nodejs!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## 运行代码

Nodejs 安装后提供了 `node` CLI，部分 OS 可能需要设置 PATH 才能使用。

打开任意一个 terminal，(cmd, powershell, git-bash, gnome-terminal, konsole, xfce4-terminal ...)

```shell
# start server
node app.js

# 如果是 Unix 可以直接在 terminal 使用 curl 访问这个 nodejs 服务器
curl -i localhost:3000

# 如果是浏览器，地址栏输入 localhost:3000
```

## 代码浅析

Ryan Dahl 在 2009 年实现了 Nodejs 的 promise，不久后(2010)就放弃掉它了。

> Regret: Not sticking with Promises
>
> -- <cite>Ryan Dahl</cite>, June 2018, JS Conf Berlin, Design mistakes in Node. 视频 [10 Things I Regret About Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA&t=314s)

ES6 之后，Nodejs 以及庞大的 npm 生态有向 Promise 兼容和迁移的趋势，但原生的 Nodejs 异步处理仍是回调。

因此，这个 http 服务器的代码实现跟传统浏览器端的代码看上去没什么区别，除了`require`。

浏览器的 `script` 标签能够让我们加载多个 JS 文件，但每一个 JS 文件自身没有作用域，所有代码全部被丢到全局当中执行。

`require` 跟其它语言中的 `import`，`use` 等类似。

Nodejs 采用 CommonJS 模块规范封装每一文件成为模块使其有文件作用域。

ES6 之后，同样的，整个生态有往 `import/export` 兼容和迁移的趋势，Nodejs 也原生的支持它了(`.mjs`, `"type": "module"`)。

## 关于 hostname 和 port

作为单机测试，`hostname` 可以使用默认的 `127.0.0.1` 或 `localhost`。

如果有联网的服务器或 VPS, 我们可以将它设置为服务器的 IP。如果没有，我们也可以在局域网中测试，使用本机在局域网中的 IP。

`port` 跟 `hostname` 一样是可选的，也就是说 `listen` 可以没有任何参数，这时 `node` 会动态选择一个闲置的端口。下面是一种在 terminal 中查询端口的方法。

```shell
# 查看 PID, 假设是 34567
ps aux | grep node

# -l listening -t tcp -n numeric -p PID/program
netstat -ltnp | grep 34567
```

不设置端口显然是不好的，本例中用到了 `process.env.PORT || 3000` 的方式设置端口。这是推荐的方式，因为操作系统的 3000 端口可能被占用了，这时我们可以给 `node` 配置一个端口。有两种方式：

1. 环境变量 `$PORT=3000`，跟在代码中硬编写一个 magic number 一样，这种方式也有潜在的冲突性。
2. 直接或间接的给 `process.env.PORT` 赋值，直接的方式也有前面的问题，间接的方式比较好，比如，编写一个专门存放一些配置信息的文件，写一个 API 读取这个文件并将配置信息写入 `process.env`，这时，我们就不必更改代码，只需调整配置文件即可。这种需求的解决已经有成熟的方案，比如 dotenv。

## TODO

本文这个服务器甚至没有 serve 一个 HTML, 也没有路由，更没有 REST 和数据库，要想逐步实现功能完整的应用，需要学习 Nodejs 提供的各种原生 API。如果求快，可以采取 Google + npm 的策略。

## 总结

[Ryan Dahl](https://github.com/ry) 的 [Deno](https://deno.land/) 1.0 已经问世了，使用它需要掌握 TS, ES6/7/8/9... 。学习这些新东西是有好处的，它们不是一个库或框架，它们是面向未来的更基础性的东西。

但是，整个生态的建立和业界实践的调整，是需要时间的，而且新的东西对于开始阶段的学习并不一定实用。

Nodejs 发展多年，生态和业界实践积累很深，掌握它可以作为进一步学习 Deno/Wsam/Rust 的基础。

现阶段，我觉得好的方式是对比学习，Deno 的快速成长，使得我们可以将很多 Node 项目迁移成 Deno。
