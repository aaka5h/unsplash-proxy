require("dotenv").config();
const http = require("http");

const proxyUtil = require('./utils/proxy');
const port = process.env.PORT || 1221;
console.log("listening on port:", port);
const server = http
  .createServer((req, res) => {
    return proxyUtil(req, res);
  })
  .listen(port);
