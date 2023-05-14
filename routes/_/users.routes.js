import express from 'express';
import { addToCart } from '../../controllers/user/user.controller';

const router = express.Router();

router.route('/cart').get().post(addToCart);

export default router;
