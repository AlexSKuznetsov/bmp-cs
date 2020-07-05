/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import ZB from 'zeebe-node';
import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config.js';

// Creating new bot constructor
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

// Telegram message sender
async function sendTelegramMsg(user, msg) {
  const result = await bot.sendMessage(user, msg);
  return result;
}

// Job worker
async function handler(job, complete, worker) {
  worker.log('Task variables', job.variables);
  console.log(job.variables);
  // Task worker business logic goes here

  const text = `Спасибо за заказ ${job.variables.name}. Отправляем вам купон на скидку 10% на следующий заказ! - 3223df43r`;
  const result = await sendTelegramMsg(7706878, text);
  console.log(result);
  const updateToBrokerVariables = {
    t_message: result.message_id,
  };
  complete.success(updateToBrokerVariables);
}

const zbc = new ZB.ZBClient();
const zbworker = zbc.createWorker('send-telegram', handler);

export default zbworker;
