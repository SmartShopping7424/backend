/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.order_status_validator = async (input) => {
  // define variables
  var errors = {};
  var required = ["order_id"];

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
      const value = String(input[key]).trim();

      // switch case on the basis of key
      switch (key) {
        case "order_id":
          if (value.length > 255) {
            errors[key].push(
              "Invalid order_id, Cannot greater than 255 characters."
            );
          } else if (value < 1) {
            errors[key].push("Invalid order_id, Cannot less than 1 character.");
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
