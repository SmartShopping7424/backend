module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" AND type=0) as exist;`;
  },

  // insert product into shop
  insert_product_in_shop(inputs) {
    return `INSERT INTO ${inputs.shop_id} 
                    (
                        product_barcode,
                        product_name,
                        product_category,
                        product_sub_category,
                        product_mrp,
                        product_selling_price,
                        product_image,
                        product_offer,
                        product_offer_type,
                        product_discount,
                        product_pack_count,
                        product_pack_price,
                        change_by,
                        created_at,
                        updated_at
                    )
                    VALUES
                    (
                        "${inputs.product_barcode}",
                        "${inputs.product_name}",
                        "${inputs.product_category}",
                        "${inputs.product_sub_category}",
                        "${inputs.product_mrp}",
                        "${inputs.product_selling_price}",
                        NULLIF("${inputs.product_image}",""),
                        ${inputs.product_offer},
                        NULLIF("${inputs.product_offer_type}",""),
                        NULLIF("${inputs.product_discount}",""),
                        NULLIF("${inputs.product_pack_count}",""),
                        NULLIF("${inputs.product_pack_price}",""),
                        "${inputs.employee_id}",
                        NOW(),
                        NOW()
                    )
                    ON DUPLICATE KEY UPDATE
                        product_name="${inputs.product_name}",
                        product_category="${inputs.product_category}",
                        product_sub_category="${inputs.product_sub_category}",
                        product_mrp="${inputs.product_mrp}",
                        product_selling_price="${inputs.product_selling_price}",
                        product_image=NULLIF("${inputs.product_image}",""),
                        product_offer=${inputs.product_offer},
                        product_offer_type=NULLIF("${inputs.product_offer_type}",""),
                        product_discount=NULLIF("${inputs.product_discount}",""),
                        product_pack_count=NULLIF("${inputs.product_pack_count}",""),
                        product_pack_price=NULLIF("${inputs.product_pack_price}",""),
                        change_by="${inputs.employee_id}";`;
  },

  // insert product into products
  insert_product_in_products(inputs) {
    return `INSERT IGNORE INTO products
                    (
                        product_barcode,
                        product_name,
                        product_category,
                        product_sub_category,
                        product_mrp,
                        product_image,
                        created_at,
                        updated_at
                    )
                    VALUES
                    (
                        "${inputs.product_barcode}",
                        "${inputs.product_name}",
                        "${inputs.product_category}",
                        "${inputs.product_sub_category}",
                        "${inputs.product_mrp}",
                        NULLIF("${inputs.product_image}",""),
                        NOW(),
                        NOW()
                    );`;
  },
};
