module.exports = {
  // check if customer exists
  check_customer_exists(mobile) {
    return `SELECT EXISTS (SELECT * FROM customers WHERE mobile='${mobile}') as exist;`;
  },

  // check if shop exists
  check_shops_exists(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id='${shop_id}') as exist;`;
  },

  // insert into pay at counter table
  insert_into_pay_at_counter(payment_id, data) {
    return `INSERT IGNORE INTO pay_at_counter
                        (
                            payment_id,
                            shop_id,
                            customer_mobile,
                            amount,
                            status,
                            created_at,
                            updated_at
                        )
                        VALUES
                        (
                            "${payment_id}",
                            "${data.shop_id}",
                            "${data.mobile}",
                            "${data.amount}",
                            "0",
                            NOW(),
                            NOW()
                        );`;
  },
};
