import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Book from '../../models/book.model';

// get all books
export const getAllBooksUser = asyncHandler(async (req, res) => {
   const { page = 1, limit = 10, searchKey } = req.query;
   const queryObject = {};

   if (searchKey) {
      queryObject.bookName = { $regex: searchKey, $options: 'i' };
   }

   const book = await Book.find(queryObject, { __v: 0 })
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .exec();

   const count = await Book.countDocuments(queryObject);

   res.status(StatusCodes.OK).json({
      data: book,
      count: count,
   });
});
