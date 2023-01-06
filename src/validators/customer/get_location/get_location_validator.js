/**
 * @description method to validate input paylaod
 * @param {*} input
 * @returns success or error
 */
module.exports.get_location_validator = async (input) => {
  // define variables
  var errors = {};
  var required = ["latitude", "longitude"];

  // latitude regex
  const regx_lat = new RegExp(
    "^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$"
  );

  // longitude regex
  const regx_lng = new RegExp(
    "^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$"
  );

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
        case "latitude":
          if (!regx_lat.test(value)) {
            errors[key].push("Invalid latitude.");
          }
          break;
        case "longitude":
          if (!regx_lng.test(value)) {
            errors[key].push("Invalid longitude.");
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
