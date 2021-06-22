require("dotenv").config();
const http = require("http"),
  httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});
proxy.on("error", function (err, req, res) {
  res.writeHead(500, {
    "Content-Type": "text/json",
  });
  // console.log('------------------ \n', err);
  res.end(err.toString());
});
proxy.on("proxyReq", function (proxyReq, req, res, options) {
  // console.log("request received", process.env.UNSPLASH_ACCESS_KEY);
  proxyReq.setHeader("Authorization", `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`);
});
const port = process.env.PORT || 1221;
console.log("listening on port:", port);
const server = http
  .createServer((req, res) => {
    proxy.web(req, res, {
      target: {
        protocol: "https:",
        host: "api.unsplash.com",
      },
      changeOrigin: true
    });
  })
  .listen(port, '0.0.0.0');
