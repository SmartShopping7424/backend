module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" AND type=0) as exist;`;
  },

  // fetch pay at counter from table
  fetch_pay_at_counter_from_table(shop_id, limit, offset) {
    return `SELECT  pay_at_counter.*,
                    customers.name as customer_name  
                FROM 
                    pay_at_counter
                INNER JOIN customers
                    ON customers.mobile=pay_at_counter.customer_mobile
                WHERE shop_id="${shop_id}" AND status=0 LIMIT ${limit} OFFSET ${offset};`;
  },
};
