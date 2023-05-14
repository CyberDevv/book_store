import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: 'Name is required',
   },
   email: {
      type: String,
      required: 'Email is required',
      unique: true,
   },
   hashPassword: {
      type: String,
      required: 'Password is required',
   },
   role: {
      type: String,
      default: 'user',
   },
   cart: {
      items: [
         {
            bookId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Book',
               required: true,
            },
            quantity: {
               type: Number,
               required: true,
            },
         },
      ],
      default: [],
   },
   createdOn: {
      type: Date,
      default: Date.now,
   },
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
   return bcrypt.compareSync(password, hashPassword);
};

UserSchema.methods.addToCart = function (book, newQuantity = 1) {
   const cartBookIndex = this.cart.items.findIndex((cp) => {
      return cp.bookId.toString() === book._id.toString();
   });
   const updatedCartItems = [...this.cart.items];

   if (cartBookIndex >= 0) {
      updatedCartItems[cartBookIndex].quantity = newQuantity;
   } else {
      updatedCartItems.push({
         bookId: book._id,
         quantity: newQuantity,
      });
   }
   const updatedCart = {
      items: updatedCartItems,
   };
   this.cart = updatedCart;
   return this.save();
};

UserSchema.methods.removeFromCart = function (bookId) {
   const updatedCartItems = this.cart.items.filter((item) => {
      return item.bookId.toString() !== bookId.toString();
   });
   this.cart.items = updatedCartItems;
   return this.save();
};

UserSchema.methods.clearCart = function () {
   this.cart = { items: [] };
   return this.save();
};

export default mongoose.model('User', UserSchema);
