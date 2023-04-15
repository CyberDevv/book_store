import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   productName: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   image: String,
   category: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      default: 1,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   addedOn: {
      type: Date,
      default: Date.now,
   },
});

export default mongoose.model('Product', ProductSchema);
