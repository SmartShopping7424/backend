module.exports = {
  // check mobile number exist in shop table
  check_mobile_in_shop(mobile) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_mobile="${mobile}") as exist;`;
  },

  // insert otp in one time password table
  insert_otp(mobile, otp) {
    return `INSERT INTO one_time_password (mobile, otp) VALUES("${mobile}", "${otp}");`;
  },
};
