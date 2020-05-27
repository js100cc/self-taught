// 这里不是一个简单的 console.log('hello world') 程序
// 而是实现一个 nodejs server 的 hello world
// 运行本程序，可以实现访问 http://localhost:3000 永远得到 Hello Nodejs! 的信息
// nodejs 服务器直接由 JS 代码实现
// 这个 app 没有路由功能
// 可以改为 text/html 并提供带 html 的字符串给 res.end 来 serve 一个 html 页面

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer();

server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});   // text/html
  res.end('Hello Nodejs!\n');   // <h1>Hello Nodejs!</h1>
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}...`);
});
