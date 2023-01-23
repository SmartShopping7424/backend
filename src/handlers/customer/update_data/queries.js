module.exports = {
  // update customer data in table
  update_customer_data_in_table(data) {
    return `UPDATE customers
                SET
                    name='${data.name}',
                    email='${data.email}',
                    gender='${data.gender}'
                WHERE
                    mobile='${data.mobile}';`;
  },

 
};
