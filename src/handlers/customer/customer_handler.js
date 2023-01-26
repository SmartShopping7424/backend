const express = require("express");
const router = express.Router();
const { verify_token } = require("../../auth/auth");
const { update_data } = require("./update_data/update_data");
const { fetch_data } = require("./fetch_data/fetch_data");
const { scan_item } = require("./scan_item/scan_item");
const { get_location } = require("./get_location/get_location");
const { update_cart } = require("./update_cart/update_cart");
const { fetch_cart } = require("./fetch_cart/fetch_cart");
const { create_order } = require("./create_order/create_order");
const { fetch_order } = require("./fetch_order/fetch_order");

router.post("/customer", verify_token, update_data);
router.get("/customer", verify_token, fetch_data);
router.post("/customer/scan", verify_token, scan_item);
router.post("/customer/location", verify_token, get_location);
router.post("/customer/cart", verify_token, update_cart);
router.get("/customer/cart", verify_token, fetch_cart);
router.post("/customer/order", verify_token, create_order);
router.get("/customer/order", verify_token, fetch_order);

module.exports = router;