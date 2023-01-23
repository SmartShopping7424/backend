module.exports = {
  // success response
  success(code, input_data, res, meta = false) {
    let obj = {};
    // if data is array
    if (Array.isArray(input_data)) {
      obj = {
        code: code,
        data: input_data,
        meta: meta,
      };
    }

    // if data is object
    else if (input_data != null && input_data.constructor.name === "Object") {
      obj = {
        code: code,
        data: input_data,
        meta: meta,
      };
    }

    // if data is message
    else {
      obj = {
        code: code,
        message: input_data,
        meta: meta,
      };
    }

    // if there is no meta
    if (!meta) {
      delete obj["meta"];
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

  // validation faliure response
  validation_faliure(code = 402, message, errors, res) {
    const obj = {
      code: code,
      message: message,
      errors: errors,
    };

    // return response
    return res.send(obj);
  },
};
