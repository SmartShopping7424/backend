const config = {
  secret_key: "dragmart",
  key_expiry: "30d",
  shop_employees: {
    type: {
      0: "Maintenance",
      1: "Security",
    },
  },
  product: {
    product_offer: {
      0: "No",
      1: "Yes",
    },
    product_offer_type: {
      0: "Discount",
      1: "Pack",
    },
  },
  page_size: 10,
  server_key:
    "AAAAZVLkznM:APA91bHBFCqzOLzC9-PLvc_uMluFlzgb5OEjF3GiAbz3-EHeWxbmTtjCf1Ac8_EJdlztfrHNvxtUeVL9rBByrWnEL4PjOEHGZ4subGkVwkox5p3Rte0zJTKn3HT_kpftTEUTohyU1xq0",
};

module.exports = config;
