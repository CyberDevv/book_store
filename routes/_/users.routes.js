import express from 'express';
import { addToCart, getCart } from '../../controllers/user/user.controller';

const router = express.Router();

router.route('/cart').get(getCart).post(addToCart);

export default router;
