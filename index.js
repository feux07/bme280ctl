import { sendToUser, initializeTelegramBot } from "./services/telegram";

const { TELEGRAM_TARGET_CHAT_ID } = process.env;

initializeTelegramBot();
