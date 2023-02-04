const FCM = require("fcm-node");
const config = require("../../config/settings");
const { logger } = require("../logger");
const fcm = new FCM(config.server_key);

module.exports = {
  // send push notification
  async send_push_notification(device_token, title, body, data = {}) {
    // push notification payload
    const payload = {
      to: device_token,
      notification: {
        title: title,
        body: body,
      },
      data: data,
    };

    fcm.send(payload, function (err, response) {
      if (err) {
        logger.error("Error while sending push notification ::: ", err);
        return false;
      } else {
        logger.info("Successfully sent the push notification ::: ", response);
        return true;
      }
    });
  },
};
