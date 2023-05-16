import express from 'express';
import {
   getAllOrders,
   getOneOrder,
} from '../../controllers/admin/order.controller';

const router = express.Router();

router.route('/').get(getAllOrders);
router.route('/:id').get(getOneOrder);

export default router;
