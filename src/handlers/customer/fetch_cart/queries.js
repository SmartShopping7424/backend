module.exports = {
  // check if customer exists
  check_customer_exists(mobile) {
    return `SELECT EXISTS (SELECT * FROM customers WHERE mobile='${mobile}') as exist;`;
  },

  // check if shop exists
  check_shops_exists(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id='${shop_id}') as exist;`;
  },

  // fetch cart data
  fetch_customer_cart_data(data) {
    return `SELECT * FROM customer_cart
                    INNER JOIN ${data.shop_id}
                        ON ${data.shop_id}.product_barcode=customer_cart.product_barcode
                    WHERE 
                        customer_cart.customer_mobile="${data.mobile}"
                    AND
                        customer_cart.shop_id="${data.shop_id}";`;
  },

  // delete cart data
  delete_cart_data(mobile, shop_id) {
    // if shop id available
    if (shop_id) {
      return `DELETE FROM customer_cart WHERE customer_mobile="${mobile}" AND shop_id!="${shop_id}";`;
    }

    // if shop id not available
    else {
      return `DELETE FROM customer_cart WHERE customer_mobile="${mobile}";`;
    }
  },
};
