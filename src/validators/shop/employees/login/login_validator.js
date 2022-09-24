/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.login_validator = async (input) => {
  // define variables
  var errors = {};
  var required = ["employee_id", "password", "shop_id", "type"];

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
          } else if (value < 1) {
            errors[key].push(
              "Invalid employee_id, Cannot less than 1 character."
            );
          }
          break;
        case "password":
          if (value.length > 8) {
            errors[key].push(
              "Invalid password, Cannot greater than 8 characters."
            );
          } else if (value < 1) {
            errors[key].push("Invalid password, Cannot less than 1 character.");
          }
          break;
        case "shop_id":
          if (value.length > 255) {
            errors[key].push(
              "Invalid shop_id, Cannot greater than 255 characters."
            );
          } else if (value < 1) {
            errors[key].push("Invalid shop_id, Cannot less than 1 character.");
          }
          break;
        case "type":
          if (!(value == 1 || value == 0)) {
            errors[key].push("Invalid type in the payload.");
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
