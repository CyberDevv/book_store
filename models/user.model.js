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
            productId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Product',
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

UserSchema.methods.addToCart = function (product, newQuantity = 1) {
   const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
   });
   const updatedCartItems = [...this.cart.items];

   if (cartProductIndex >= 0) {
      updatedCartItems[cartProductIndex].quantity = newQuantity;
   } else {
      updatedCartItems.push({
         productId: product._id,
         quantity: newQuantity,
      });
   }
   const updatedCart = {
      items: updatedCartItems,
   };
   this.cart = updatedCart;
   return this.save();
};

UserSchema.methods.removeFromCart = function (productId) {
   const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
   });
   this.cart.items = updatedCartItems;
   return this.save();
};

UserSchema.methods.clearCart = function () {
   this.cart = { items: [] };
   return this.save();
};

export default mongoose.model('User', UserSchema);
