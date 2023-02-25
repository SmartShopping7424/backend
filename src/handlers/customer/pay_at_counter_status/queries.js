module.exports = {
  // check pay at counter status
  check_pay_at_counter_status(payment_id) {
    return `SELECT * FROM pay_at_counter WHERE payment_id="${payment_id}" LIMIT 1;`;
  },
};
