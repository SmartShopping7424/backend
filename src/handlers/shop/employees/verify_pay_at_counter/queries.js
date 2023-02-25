module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" AND type=0) as exist;`;
  },

  // verify pay at counter from table
  verify_pay_at_counter_from_table(employee_id, shop_id, payment_id) {
    return `UPDATE pay_at_counter 
                    SET 
                        status=1, 
                        receive_by="${employee_id}"
                    WHERE
                        shop_id="${shop_id}"
                    AND
                        payment_id="${payment_id}"`;
  },
};
