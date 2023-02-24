/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.update_data_validator = async (input) => {
  // define variables
  var errors = {};
  var required = ["mobile", "name", "email", "gender"];

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
        case "name":
          if (value.length > 255) {
            errors[key].push(
              "Invalid name, Cannot greater than 255 characters."
            );
          } else if (value.length < 1) {
            errors[key].push("Invalid name, Cannot less than 1 character.");
          }
          break;
        case "email":
          var mail_format =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!mail_format.test(value.toLowerCase())) {
            errors[key].push("Invalid email in payload.");
          }
          break;
        case "gender":
          if (!(value == "male" || value == "female" || value == "other")) {
            errors[key].push("Invalid gender in the payload.");
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
