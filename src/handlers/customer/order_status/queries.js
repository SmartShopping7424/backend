module.exports = {
  // check order status
  check_order_status(order_id) {
    return `SELECT * FROM orders WHERE order_id="${order_id}" LIMIT 1;`;
  },
};
