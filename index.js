require("dotenv").config();

import { sendToUser, initializeTelegramBot, bot } from "./services/telegram";

import { sensorData, readSensorData } from "./services/bme280";

import { prettier } from "./util/format";

const cron = require("node-cron");

const {
  TELEGRAM_ADMIN_USER,
  TELEGRAM_TARGET_CHAT_ID,
  READ_SENSOR_CRON_EXP,
  SCHEDULED_NOTIFICATION_CRON_EXP,
} = process.env;

readSensorData();

initializeTelegramBot();

cron.schedule(READ_SENSOR_CRON_EXP, () => {
  readSensorData();
});

cron.schedule(SCHEDULED_NOTIFICATION_CRON_EXP, () => {
  sendToUser(TELEGRAM_TARGET_CHAT_ID, prettier(sensorData));
});

bot.command("getData", (ctx) => {
  let message = `I can only serve ${TELEGRAM_ADMIN_USER}..!`;

  if (ctx.update.message.from.username === TELEGRAM_ADMIN_USER) {
    if (sensorData) {
      return ctx.replyWithHTML(prettier(sensorData));
    } else {
      message = "Sensor is not initialized currently";
    }
  }

  return ctx.reply(message);
});
