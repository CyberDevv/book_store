import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { error404 } from './controllers/error404.controller';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.route';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

// cors setup
app.use(cors());

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// jwt setup
app.use((req, res, next) => {
   if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
   ) {
      jwt.verify(
         req.headers.authorization.split(' ')[1],
         process.env.JWT_SECRET,
         (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
         }
      );
   } else {
      req.user = undefined;
      next();
   }
});

// routes
authRoutes(app, '/auth');
productRoutes(app, '/api/v1/product');
app.use(error404);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
