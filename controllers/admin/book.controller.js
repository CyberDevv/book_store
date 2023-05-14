import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../../errors';
import Book from '../../models/book.model';
import logger from '../../utils/winston';

// Add Book
export const addBook = asyncHandler(async (req, res) => {
   const { bookName, description, price, image, category, quantity } = req.body;

   await new Book({
      bookName,
      description,
      price,
      image,
      category,
      quantity,
      userId: req.user._id,
   }).save();

   logger.info(`User ${req.user._id} added a new book => ${bookName}`);

   res.status(StatusCodes.CREATED).json({
      message: 'Book added successfully',
   });
});

// Edit book
export const editBook = asyncHandler(async (req, res) => {
   const { bookName, description, price, image, category, quantity } = req.body;

   const book = await Book.findOneAndUpdate(
      { _id: req.params.id },
      {
         bookName,
         description,
         price,
         image,
         category,
         quantity,
      },
      { new: true }
   );

   if (!book) throw new NotFoundError('Book not found');

   logger.info(`User ${req.user._id} edited a book => ${bookName}`);

   res.status(StatusCodes.OK).json({
      message: 'Book updated successfully',
   });
});

// delete book
export const deleteBook = asyncHandler(async (req, res) => {
   const book = await Book.findOneAndDelete({ _id: req.params.id });

   if (!book) throw new NotFoundError('Book not found');

   logger.info(`User ${req.user._id} deleted a book => ${book.bookName}`);

   res.status(200).json({
      message: 'Book deleted successfully',
   });
});

// get one book
export const getOneBook = asyncHandler(async (req, res) => {
   const book = await Book.findById(req.params.id, { __v: 0 });

   if (!book) throw new NotFoundError('Book not found');

   res.status(200).json({
      data: book,
   });
});

// get all books
export const getAllBooks = asyncHandler(async (req, res) => {
   const book = await Book.find(
      {
         userId: req.user._id,
      },
      { __v: 0, userId: 0 }
   );

   res.status(200).json({
      data: book,
   });
});
