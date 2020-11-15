require("dotenv").config();

import { Telegram, Telegraf } from "telegraf";

const {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_ADMIN_USER,
  TELEGRAM_TARGET_CHAT_ID,
} = process.env;

const telegram = new Telegram(TELEGRAM_BOT_TOKEN);

let modeStatus = true;

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

function initializeTelegramBot() {
  bot.start((ctx) => ctx.reply("Welcome to BME280ctl bot"));

  bot.launch();
  sendToUser(
    TELEGRAM_TARGET_CHAT_ID,
    `<strong>BME280ctl bot is started...</strong>`
  );
}

function sendToUser(to, message) {
  if (modeStatus) {
    telegram.sendMessage(to, message, {
      disable_web_page_preview: true,
      parse_mode: "HTML",
    });
  }
}

export { sendToUser, initializeTelegramBot, bot };
