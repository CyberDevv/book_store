import express from 'express';
import {
   getAllBooksUser,
   getBookById,
} from '../../controllers/user/book.controller';

const router = express.Router();

router.route('/').get(getAllBooksUser);
router.route('/:id').get(getBookById);

export default router;
