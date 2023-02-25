const express = require("express");
const router = express.Router();
const { verify_token } = require("../../auth/auth");
const { create_id } = require("./employees/create_id/create_id");
const { login } = require("./employees/login/login");
const { add_product } = require("./employees/add_product/add_product");
const { get_product } = require("./employees/get_product/get_product");
const { scan_product } = require("./employees/scan_product/scan_product");
const { scan_order } = require("./employees/scan_order/scan_order");
const { verify_order } = require("./employees/verify_order/verify_order");
const {
  fetch_pay_at_counter,
} = require("./employees/fetch_pay_at_counter/fetch_pay_at_counter");
const {
  verify_pay_at_counter,
} = require("./employees/verify_pay_at_counter/verify_pay_at_counter");

router.post("/shop/employee/create_id", verify_token, create_id);
router.post("/shop/employee/login", login);
router.post("/shop/employee/add_product", verify_token, add_product);
router.post("/shop/employee/get_product", verify_token, get_product);
router.post("/shop/employee/scan_product", verify_token, scan_product);
router.post("/shop/employee/scan_order", verify_token, scan_order);
router.post("/shop/employee/verify_order", verify_token, verify_order);
router.post(
  "/shop/employee/fetch_pay_at_counter",
  verify_token,
  fetch_pay_at_counter
);
router.post(
  "/shop/employee/verify_pay_at_counter",
  verify_token,
  verify_pay_at_counter
);

module.exports = router;
