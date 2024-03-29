/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.update_cart_validator = async (input) => {
  // define variables
  var errors = {};
  var required = [
    "mobile",
    "shop_id",
    "product_barcode",
    "product_quantity",
    "mode",
  ];

  // check if any require key is missing from input payload
  required.map((key) => {
    if (!input.hasOwnProperty(key)) {
      errors[key] = [`${key} is required in the payload.`];
    } else {
      errors[key] = [];
    }
  });

  // check the input payload
  for (let key in input) {
    if (input.hasOwnProperty(key)) {
      // assign the value of key
      const value = String(input[key]).trim();

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
        case "product_barcode":
          if (value.length > 255) {
            errors[key].push(
              "Invalid product_barcode, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push(
              "Invalid product_barcode, Cannot less than 1 character."
            );
          }
          break;
        case "product_quantity":
          if (!value || parseInt(value) <= 0 || isNaN(parseInt(value))) {
            errors[key].push("Invalid product_quantity.");
          }
          break;
        case "mode":
          if (!(value == "update" || value == "remove")) {
            errors[key].push("Invalid mode in the payload.");
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
