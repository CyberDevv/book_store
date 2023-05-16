import express from 'express';
import {
   addToCart,
   getCart,
   removeCart,
} from '../../controllers/user/user.controller';

const router = express.Router();

router.route('/cart').get(getCart).post(addToCart);
router.route('/cart/:id').delete(removeCart);

export default router;
