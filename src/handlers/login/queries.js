module.exports = {
  // check mobile number exist in shop table
  check_mobile_in_shop(mobile) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_mobile='${mobile}') as exist;`;
  },

  // check mobile number exist in customer table
  check_mobile_in_customer(mobile) {
    return `SELECT EXISTS (SELECT * FROM customers WHERE mobile='${mobile}') as exist;`;
  },
};
