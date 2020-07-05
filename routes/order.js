/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import OrderModel from '../models/orders-model.js';
import startProcess from '../middleware/start-process.js';

const route = express.Router();

route.get('/orders', async (req, res) => {
  const orders = await OrderModel.find();
  res.render('order', {
    orders,
  });
});

route.post('/order', async (req, res) => {
  const {
    name,
    email,
    phone,
    summ,
    delivery,
  } = req.body;
  const order = new OrderModel({
    name,
    email,
    phone,
    summ,
    delivery,
  });
  const result = await order.save();
  console.log(result);
  res.status(200).json({ message: 'ok' });
  const process = await startProcess(name, email, phone, summ, delivery);
  await OrderModel.findByIdAndUpdate({ _id: result._id }, {
    $set: {
      processId: process.workflowInstanceKey,
    },
  });
});

export default route;
