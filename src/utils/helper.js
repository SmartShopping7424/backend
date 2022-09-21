module.exports = {
  // parse resposne from query
  parseResponse(query_data) {
    let data = query_data.map((item) => ({ ...item }));
    // if data array is greater than 1
    if (data.length > 1) {
      return data;
    }
    // if data array is less than 1
    else {
      return data[0];
    }
  },
};
