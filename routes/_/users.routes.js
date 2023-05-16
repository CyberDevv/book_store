import express from 'express';
import {
   addToCart,
   getCart,
   removeCart,
   checkout,
} from '../../controllers/user/user.controller';

const router = express.Router();

router.route('/cart').get(getCart).post(addToCart);
router.route('/cart/:id').delete(removeCart);
router.route('/cart/checkout').post(checkout);

export default router;
