module.exports = {
  // parse resposne from query
  parseResponse(query_data) {
    const data = query_data.map((item) => ({ ...item }));
    // if data array length is 0
    if (data.length == 0) {
      return null;
    }
    // if data array is greater than 1
    else if (data.length > 1) {
      return data;
    }
    // if data array is less than 1
    else {
      return data[0];
    }
  },

  // generate random number of any length
  generateNumber(length) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  },
};
