const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../auth/auth");
const { update_data } = require("./update_data/update_data");
const { fetch_data } = require("./fetch_data/fetch_data");
const { scan_item } = require("./scan_item/scan_item");

router.post("/customer", verifyToken, update_data);
router.get("/customer", verifyToken, fetch_data);
router.post("/customer/scan", verifyToken, scan_item);

module.exports = router;
