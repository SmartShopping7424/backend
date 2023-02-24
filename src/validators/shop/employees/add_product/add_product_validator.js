/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.add_product_validator = async (input) => {
  // define variables
  var errors = {};
  var required = [
    "employee_id",
    "shop_id",
    "product_barcode",
    "product_name",
    "product_category",
    "product_sub_category",
    "product_mrp",
    "product_selling_price",
    "product_image",
    "product_offer",
    "product_offer_type",
    "product_discount",
    "product_pack_count",
    "product_pack_price",
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
        case "employee_id":
          if (value.length > 255) {
            errors[key].push(
              "Invalid employee_id, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push(
              "Invalid employee_id, Cannot less than 1 character."
            );
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
        case "product_name":
          if (value.length > 255) {
            errors[key].push(
              "Invalid product_name, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push(
              "Invalid product_name, Cannot less than 1 character."
            );
          }
          break;
        case "product_category":
          if (value.length > 255) {
            errors[key].push(
              "Invalid product_category, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push(
              "Invalid product_category, Cannot less than 1 character."
            );
          }
          break;
        case "product_sub_category":
          if (value.length > 255) {
            errors[key].push(
              "Invalid product_sub_category, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push(
              "Invalid product_sub_category, Cannot less than 1 character."
            );
          }
          break;
        case "product_mrp":
          if (!value || parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
            errors[key].push("Invalid product_mrp.");
          }
          break;
        case "product_selling_price":
          if (!value || parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
            errors[key].push("Invalid product_selling_price.");
          }
          break;
        case "product_image":
          if (value) {
            if (value.length > 255) {
              errors[key].push(
                "Invalid product_image, Cannot greater than 255 characters."
              );
            } else if (value.length < 1) {
              errors[key].push(
                "Invalid product_image, Cannot less than 1 character."
              );
            }
          }
          break;
        case "product_offer":
          if (!value || !(value == 0 || value == 1)) {
            errors[key].push("Invalid product_offer.");
          }
          break;
        case "product_offer_type":
          if (value) {
            if (!(value == 0 || value == 1)) {
              errors[key].push("Invalid product_offer_type.");
            }
          }
          break;
        case "product_discount":
          if (value) {
            if (parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
              errors[key].push("Invalid product_discount.");
            }
          }
          break;
        case "product_pack_count":
          if (value) {
            if (parseInt(value) <= 0 || isNaN(parseInt(value))) {
              errors[key].push("Invalid product_pack_count.");
            }
          }
          break;
        case "product_pack_price":
          if (value) {
            if (parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
              errors[key].push("Invalid product_pack_price.");
            }
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
