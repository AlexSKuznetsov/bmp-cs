import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  summ: Number,
  delivery: String,
  placedAt: { type: Date, default: new Date() },
  processId: String,
});

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;
