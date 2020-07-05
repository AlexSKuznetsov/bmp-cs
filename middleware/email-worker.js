/* eslint-disable no-console */
/* eslint-disable import/extensions */
import ZB from 'zeebe-node';
import mailgun from 'mailgun-js';
import 'dotenv/config.js';

// Sendmail function
async function sendEmail() {
  const mg = mailgun({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
  });
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'kuznecov.alexandr@gmail.com',
    subject: 'Спасибо за заказ!',
    text: 'Новое сообщение',
  };
  const result = await mg.messages().send(data);
  return result;
}

// Job handler
async function handler(job, complete, worker) {
  worker.log('Task variables', job.variables);
  // Task worker business logic goes here
  const result = await sendEmail();
  console.log(result);
  const updateToBrokerVariables = {
    welkomeSended: true,
    emailId: result.id,
  };
  complete.success(updateToBrokerVariables);
}

// Register job worker
const zbc = new ZB.ZBClient();
const zbworker = zbc.createWorker('send-email', handler);

export default zbworker;
