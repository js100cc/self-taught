// 本程序在 hello-world-server.js 的基础上增添部分路由功能
// 假设服务器只提供3个页面，index.html，about.html，404.html
// 本例分析 request 的 url 来提供相应的页面，从而实现静态页面的简单路由
// 此例不能自动提供 statusCode 和 mime-type，也不能自适应任意页面
// 但它的基本原理足以支撑起学习阶段服务器 serve 页面的大部分需求。
// 更健壮的实现需要学习更多的 nodejs 基础

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer();


const serveFile = (res, url, statusCode, contentType) => {
  fs.readFile(url, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
};

server.on('request', (req, res) => {
  // req.url 得到 protocol://hostname:port/url 中的 /url
  const url = req.url.toLowerCase().replace(/\/?(?:\?.*)?$/, '');
  switch (url) {
    case '':
      serveFile(res, './index.html', 200, 'text/html');
      break;
    case '/about':
      serveFile(res, './about.html', 200, 'text/html');
      break;
    default:
      serveFile(res, './404.html', 404, 'text/html');
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}...`);
});
