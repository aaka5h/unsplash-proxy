const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (err, req, res) {
  res.writeHead(500, {
    "Content-Type": "text/json",
  });
  res.end(err.toString());
});
proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.setHeader("Authorization", `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`);
});


const proxyUtil = function (req, res) {
  proxy.web(req, res, {
    target: {
      protocol: "https:",
      host: "api.unsplash.com",
    },
    secure: true
    // changeOrigin: true
  });
}

module.exports = proxyUtil;
