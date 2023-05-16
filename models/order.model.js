import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
   books: [
      {
         book: {
            type: Object,
            ref: 'Book',
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
      },
   ],
   user: {
      name: {
         type: String,
         required: true,
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
   },
   status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed', 'cancelled'],
   },
   createdOn: {
      type: Date,
      default: Date.now,
   },
});

export default mongoose.model('Order', orderSchema);
