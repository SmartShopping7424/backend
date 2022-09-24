module.exports = {
  // fetch otp from one time password table
  fetch_otp(mobile) {
    return `SELECT otp FROM one_time_password WHERE mobile='${mobile}' ORDER BY created_at DESC LIMIT 1;`;
  },
};
