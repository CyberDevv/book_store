import express from 'express';
import {
   getAllOrders,editOrder,
   getOneOrder,
} from '../../controllers/admin/order.controller';

const router = express.Router();

router.route('/').get(getAllOrders);
router.route('/:id').get(getOneOrder).patch(editOrder);

export default router;
