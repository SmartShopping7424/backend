const express = require("express");
const router = express.Router();
const { verify_token } = require("../../auth/auth");
const { create_id } = require("./employees/create_id/create_id");
const { login } = require("./employees/login/login");
const { add_product } = require("./employees/add_product/add_product");
const { get_product } = require("./employees/get_product/get_product");
const { scan_product } = require("./employees/scan_product/scan_product");

router.post("/shop/employee/create_id", verify_token, create_id);
router.post("/shop/employee/login", login);
router.post("/shop/employee/add_product", verify_token, add_product);
router.post("/shop/employee/get_product", verify_token, get_product);
router.post("/shop/employee/scan_product", verify_token, scan_product);

module.exports = router;
