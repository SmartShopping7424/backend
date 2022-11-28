module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // fetch employee data
  fetch_employee_data(employee_id, shop_id) {
    return `SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" LIMIT 1;`;
  },
};
