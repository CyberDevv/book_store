import asyncHandler from 'express-async-handler';
import { NotFoundError } from '../../errors';
import Book from '../../models/book.model';
import User from '../../models/user.model';
import Order from '../../models/order.model';
import logger from '../../utils/winston';
import { StatusCodes } from 'http-status-codes';

// add book to cart
export const addToCart = asyncHandler(async (req, res) => {
   const { bookId, quantity = 1 } = req.body;

   const book = await Book.findById(bookId);

   if (!book) throw new NotFoundError('Book not found');

   const user = await User.findById(req.user._id);
   await user.addToCart(book, quantity);

   logger.info(`Book added to cart by user ${req.user._id}`);

   res.status(StatusCodes.OK).json({
      message: 'Book added to cart',
   });
});

// get cart
export const getCart = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id).populate('cart.items.bookId');

   res.status(StatusCodes.OK).json({
      data: user.cart.items,
   });
});

// remove cart
export const removeCart = asyncHandler(async (req, res) => {
   console.log(req.params.id);
   console.log(req.user._id);

   const user = await User.findById(req.user._id);

   await user.removeFromCart(req.params.id);

   logger.info(`Book removed from cart by user ${req.user._id}`);

   res.status(StatusCodes.OK).json({
      message: 'Book removed from cart',
   });
});

// cart checkout
export const checkout = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id).populate('cart.items.bookId');

   const books = user.cart.items.map((item) => {
      return {
         quantity: item.quantity,
         book: { ...item.bookId._doc },
      };
   });

   // payment gateway

   const order = await new Order({
      user: {
         name: req.user.name,
         userId: req.user._id,
      },
      books: books,
   }).save();

   await user.clearCart();

   logger.info(`Cart checked out by user ${req.user._id}`);

   res.status(StatusCodes.OK).json({
      message: 'Cart checked out',
   });
});

// get orders
export const getOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({ 'user.userId': req.user._id }, { __v: 0 });

   res.status(StatusCodes.OK).json({
      data: orders,
   });
});
