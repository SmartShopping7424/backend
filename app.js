const express = require("express");
const bp = require("body-parser");
const app = express();

// login router
const login_router = require("./src/handler/login/login_handler");
// shop route
const shop_routes = require("./src/handler/shop/shop_handler");

// use routes
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(shop_routes);
app.use(login_router);

app.listen(80, () => {
  console.log("Server is running at port 80");
});
