module.exports = {
  // fetch customer data from table
  fetch_customer_data_from_table(mobile) {
    return `SELECT * FROM customers WHERE mobile='${mobile}' LIMIT 1;`;
  },
};
