import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'AddBook', required: true },
  title: String,
  author: String,
  category: [String],
  bookType: String,
  condition: String,
  pages: Number,
  price: Number,
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
  isReturned: { type: Number, default: 0 },
  defectDescription: { type: String, default: '' },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;

// --- Add below for delete by _id (for controller/route usage) ---
// Example usage in controller:
// await Order.findByIdAndDelete(orderId);
