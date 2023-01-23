module.exports = {
  // fetch shop with nearest latitude and longitude
  fetch_shop_with_nearest_lat_lng(latitude, longitude) {
    return `select shops.*, cast((sqrt(
                      pow(69.1 * (shop_latitude - ${latitude}), 2) + 
                      pow(69.1 * (${longitude} - shop_longitude) * cos(shop_latitude / 57.3), 2)) * 1609) as decimal(10,0))
                    as distance
                  from shops order by distance limit 5;`;
  },
};
