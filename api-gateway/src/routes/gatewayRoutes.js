const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
  "/api/combos",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
  })
);

router.use(
  "/api/pedidos",
  createProxyMiddleware({
    target: "http://localhost:5002", 
    changeOrigin: true,
  })
);

module.exports = router;
