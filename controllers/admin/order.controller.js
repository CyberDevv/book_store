import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Order from '../../models/order.model';
import { NotFoundError } from '../../errors';

// get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find(
      { 'user.userId': req.user._id },
      { __v: 0 }
   ).sort({
      createdAt: 'desc',
   });

   res.status(StatusCodes.OK).json({
      data: orders,
   });
});

// get one order
export const getOneOrder = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id, { __v: 0 });

   if (!order) throw new NotFoundError('Order not found');

   res.status(StatusCodes.OK).json({
      data: order,
   });
});
