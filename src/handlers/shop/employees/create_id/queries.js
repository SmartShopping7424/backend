module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}") as exist;`;
  },

  // insert employee id in table
  insert_employee_id(employee_id, password, shop_id, type) {
    return `INSERT INTO shop_employees (employee_id, password, shop_id, type) VALUES ("${employee_id}", "${password}", "${shop_id}", ${type});`;
  },
};
