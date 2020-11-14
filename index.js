require("dotenv").config();

import { sendToUser, initializeTelegramBot, bot } from "./services/telegram";

import { sensorData, readSensorData } from "./services/bme280";

const cron = require("node-cron");

const { TELEGRAM_ADMIN_USER, TELEGRAM_TARGET_CHAT_ID } = process.env;

const format = (data) => {
  return data
    .toString()
    .split(".")
    .map((val, i) => (i === 1 ? val.substring(0, 2) : val))
    .join(".");
};

initializeTelegramBot();

cron.schedule("* * * * *", () => {
  readSensorData();
});

bot.command("getData", (ctx) => {
  let message = `I can only serve ${TELEGRAM_ADMIN_USER}..!`;

  if (ctx.update.message.from.username === TELEGRAM_ADMIN_USER) {
    if (sensorData) {
      return ctx.replyWithHTML(
        `<strong>Temperature:</strong>  ${format(sensorData.temperature)} C
          \n<strong>Humidity:</strong>  %${format(sensorData.humidity)}
          \n<strong>Pressure:</strong> ${format(sensorData.pressure)} hPa
          \n<strong>Last updated at:</strong> ${format(sensorData.lastUpdated)}`
      );
    } else {
      message = "Sensor is not initialized currently";
    }
  }

  return ctx.reply(message);
});
