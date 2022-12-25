const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../auth/auth");
const { create_id } = require("./employees/create_id/create_id");
const { login } = require("./employees/login/login");
const { add_product } = require("./employees/add_product/add_product");
const { get_product } = require("./employees/get_product/get_product");
const { scan_product } = require("./employees/scan_product/scan_product");

router.post("/shop/employee/create_id", verifyToken, create_id);
router.post("/shop/employee/login", login);
router.post("/shop/employee/add_product", verifyToken, add_product);
router.post("/shop/employee/get_product", verifyToken, get_product);
router.post("/shop/employee/scan_product", verifyToken, scan_product);

module.exports = router;
