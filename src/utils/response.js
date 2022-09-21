module.exports = {
  // success response
  success(code, input_data, res) {
    let obj = {};
    // if data is array
    if (Array.isArray(input_data)) {
      obj = {
        code: code,
        data: input_data,
      };
    }

    // if data is object
    else if (input_data != null && input_data.constructor.name === "Object") {
      obj = {
        code: code,
        data: input_data,
      };
    }

    // if data is message
    else {
      obj = {
        code: code,
        message: input_data,
      };
    }

    // return response
    return res.send(obj);
  },

  // failure response
  failure(code, input_data, res) {
    let obj = {};
    // if data is array
    if (Array.isArray(input_data)) {
      obj = {
        code: code,
        data: input_data,
      };
    }

    // if data is object
    else if (input_data != null && input_data.constructor.name === "Object") {
      obj = {
        code: code,
        data: input_data,
      };
    }

    // if data is message
    else {
      obj = {
        code: code,
        message: input_data,
      };
    }

    // return response
    return res.send(obj);
  },
};
