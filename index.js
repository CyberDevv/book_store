import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import { error404 } from './controllers/error404.controller';
import {
   adminRequired,
   errorHandlerMiddleware,
   loginRequired,
   requestLogger,
   verifyJwt,
} from './middleware';
import booksRoutes from './routes/_/books.routes';
import usersRoutes from './routes/_/users.routes';
import adminBooksRoutes from './routes/admin/books.routes';
import adminOrdersRoutes from './routes/admin/orders.routes';
import authRoutes from './routes/auth.routes';
import connectDB from './utils/dbConnect';
import logger from './utils/winston';
import('express-async-errors');

dotenv.config();
const app = express();

// setups
app.use(cors());
app.use(helmet());
app.use(xss());

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// jwt setup
app.use(verifyJwt);

// logger middleware
app.use(requestLogger);

// routes
app.use('/auth', authRoutes);
app.use('/api/v1/books', loginRequired, booksRoutes);
app.use('/api/v1/users', loginRequired, usersRoutes);
app.use('/api/v1/admin/books', adminRequired, loginRequired, adminBooksRoutes);
app.use('/api/v1/admin/orders', adminRequired, loginRequired, adminOrdersRoutes);
app.use(error404);

// error handler
app.use(errorHandlerMiddleware);

// server setup
const start = async () => {
   try {
      await connectDB(process.env.MONGODB_URI);
      app.listen(
         process.env.PORT,
         logger.info(`Server is running on port ${process.env.PORT}`)
      );
   } catch (error) {
      logger.error(error);
   }
};

start();
