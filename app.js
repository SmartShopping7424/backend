const express = require("express");
const body_parser = require("body-parser");
const app = express();

// logger
const { logger } = require("./src/utils/logger");

// routes
const login_route = require("./src/handlers/login/login_handler");
const shop_route = require("./src/handlers/shop/shop_handler");
const customer_route = require("./src/handlers/customer/customer_handler");

// default server port
const SERVER_PORT = 3000;

// request body parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// use routes
app.use(login_route);
app.use(shop_route);
app.use(customer_route);

// app server
const server = app.listen(SERVER_PORT, () => {
  logger.info(`Server is running on port ${SERVER_PORT}`);
});

module.exports = server;
