/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.create_order_validator = async (input) => {
  // define variables
  var errors = {};
  var required = [
    "mobile",
    "shop_id",
    "orders",
    "total_item",
    "total_mrp",
    "total_amount",
  ];

  // check if any require key is missing from input payload
  required.map((key) => {
    if (!input.hasOwnProperty(key)) {
      errors[key] = [`${key} is required in the query params.`];
    } else {
      errors[key] = [];
    }
  });

  // check the input payload
  for (let key in input) {
    if (input.hasOwnProperty(key)) {
      // assign the value of key
      const value = input[key];

      // switch case on the basis of key
      switch (key) {
        case "mobile":
          var number_format = /^[6-9][0-9]{9}$/;
          if (!number_format.test(value)) {
            errors[key].push("Invalid mobile in payload.");
          }
          break;
        case "shop_id":
          if (value.length > 255) {
            errors[key].push(
              "Invalid shop_id, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push("Invalid shop_id, Cannot less than 1 character.");
          }
          break;
        case "orders":
          var require_order_key = ["product_barcode", "product_quantity"];
          if (Array.isArray(value)) {
            if (value.length > 0) {
              for (var e in value) {
                var order_key = Object.getOwnPropertyNames(value[e]);
                var match = order_key.some((key) =>
                  require_order_key.includes(key)
                );
                if (!match) {
                  errors[key].push("Invalid orders.");
                }
              }
            } else {
              errors[key].push("Invalid orders.");
            }
          } else {
            errors[key].push("Invalid orders.");
          }
          break;
        case "total_item":
          if (!value || parseInt(value) <= 0 || isNaN(parseInt(value))) {
            errors[key].push("Invalid total_item.");
          }
          break;
        case "total_mrp":
          if (!value || parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
            errors[key].push("Invalid total_mrp.");
          }
          break;
        case "total_amount":
          if (!value || parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
            errors[key].push("Invalid total_amount.");
          }
          break;
        default:
          break;
      }
    }
  }

  // check the errors
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      let value = errors[key];
      if (value.length == 0) {
        delete errors[key];
      }
    }
  }

  // return the object
  return errors;
};
