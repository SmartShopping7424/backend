module.exports = {
  // check if customer exists
  check_customer_exists(mobile) {
    return `SELECT EXISTS (SELECT * FROM customers WHERE mobile='${mobile}') as exist;`;
  },

  // fetch customer order
  fetch_customer_orders(mobile, limit, offset) {
    return `SELECT * FROM orders WHERE customer_mobile="${mobile}" ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`;
  },
};
