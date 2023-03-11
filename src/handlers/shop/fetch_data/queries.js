module.exports = {
  // fetch shop data from table
  fetch_shop_data_from_table(shop_mobile) {
    return `SELECT * FROM shops WHERE shop_mobile='${shop_mobile}' LIMIT 1;`;
  },
};
