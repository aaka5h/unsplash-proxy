require("dotenv").config();
const serverless = require("serverless-http");
const proxyUtil = require('../utils/proxy');

function changePath(url) {
  const regex = /.*\/unsplash-proxy(.*)/;
  console.log('checking', url);
  const match = url.match(regex);
  // console.log('------------------------',match[1]);
  return match[1];
}
const handler = serverless((req, res) => {
  req.url = changePath(req.url);
  return proxyUtil(req, res);
});
exports.handler = async function (event, context, callback) {
  console.log('wo hoo, reached here!');
  return handler(event, context);
}