module.exports = {
  // check if customer exists
  check_customer_exists(mobile) {
    return `SELECT EXISTS (SELECT * FROM customers WHERE mobile='${mobile}') as exist;`;
  },

  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // clear cart data
  clear_cart_data(mobile, shop_id) {
    return `DELETE FROM customer_cart WHERE customer_mobile="${mobile}" AND shop_id="${shop_id}";`;
  },

  // insert into orders
  insert_into_orders(order_id, data) {
    return `INSERT IGNORE INTO orders
                    (
                        order_id,
                        customer_mobile,
                        shop_id,
                        total_item,
                        total_mrp,
                        total_amount,
                        created_at,
                        updated_at
                    )
                    VALUES
                    (
                        "${order_id}",
                        "${data.mobile}",
                        "${data.shop_id}",
                        "${data.total_item}",
                        "${data.total_mrp}",
                        "${data.total_amount}",
                        NOW(),
                        NOW()
                    );`;
  },

  // insert into order details
  insert_into_orders_details(order_id, product_barcode, product_quantity) {
    return `INSERT IGNORE INTO order_details
                    (
                        order_id,
                        product_barcode,
                        product_quantity,
                        created_at,
                        updated_at
                    )
                    VALUES
                    (
                        "${order_id}",
                        "${product_barcode}",
                        "${product_quantity}",
                        NOW(),
                        NOW()
                    );`;
  },
};
