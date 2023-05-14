import asyncHandler from 'express-async-handler';
import { NotFoundError } from '../../errors';
import Book from '../../models/book.model';
import User from '../../models/user.model';
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
