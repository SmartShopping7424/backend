module.exports = {
  // check if customer exists
  check_customer_exists(mobile) {
    return `SELECT EXISTS (SELECT * FROM customers WHERE mobile='${mobile}') as exist;`;
  },

  // check if product exists in shops
  check_product_exists_in_shop(shop_id, product_barcode) {
    return `SELECT EXISTS (SELECT * FROM ${shop_id} WHERE product_barcode='${product_barcode}') as exist;`;
  },

  // update customer cart data
  update_customer_cart_data(data) {
    // if mode is remove
    if (data.mode == "remove") {
      return `DELETE FROM customer_cart WHERE customer_mobile="${data.mobile}" AND shop_id="${data.shop_id}" AND product_barcode="${data.product_barcode}";`;
    }

    // if mode is not remove
    else {
      return `INSERT INTO customer_cart
                    (
                        customer_mobile,
                        shop_id,
                        product_barcode,
                        product_quantity,
                        created_at,
                        updated_at
                    )
                    VALUES
                    (
                        "${data.mobile}",
                        "${data.shop_id}",
                        "${data.product_barcode}",
                        "${data.product_quantity}",
                        NOW(),
                        NOW()
                    ) 
                    ON DUPLICATE KEY UPDATE 
                        product_quantity="${data.product_quantity}";`;
    }
  },
};
