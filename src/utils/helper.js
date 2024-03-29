module.exports = {
  // parse resposne from query
  parse_response(query_data) {
    // if query data available
    if (query_data) {
      // if query data is array
      if (Array.isArray(query_data)) {
        const data = query_data.map((item) => ({ ...item }));
        // if data array length is 0
        if (data.length == 0) {
          return {};
        }
        // if data array is greater than 1
        else if (data.length > 1) {
          return data;
        }
        // if data array is less than 1
        else {
          return data[0];
        }
      }
      // if query data is not array
      else {
        return null;
      }
    }
    // if query data not available
    else {
      return null;
    }
  },

  // generate random number of any length
  generate_number(length) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  },

  // generate order id
  generate_order_id() {
    return `OID${Math.floor(new Date().valueOf() * Math.random())}`;
  },

  // get date in dd-mm-yyyy format
  get_formatted_date(given_date, time = false) {
    const date = new Date(given_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return time
      ? `${day}-${month}-${year} ${hour}:${minute}:${seconds}`
      : `${day}-${month}-${year}`;
  },

  // generate payment id
  generate_payment_id() {
    return `PID${Math.floor(new Date().valueOf() * Math.random())}`;
  },
};
