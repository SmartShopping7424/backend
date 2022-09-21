const express = require("express");
const body_parser = require("body-parser");
const app = express();

const SERVER_PORT = 3000;

// login route
const login_route = require("./src/handlers/login/login_handler");
// shop route
const shop_route = require("./src/handlers/shop/shop_handler");

// request body parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// use of routes
app.use(login_route);
app.use(shop_route);

// app server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
