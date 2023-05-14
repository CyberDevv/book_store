import express from 'express';
import {
   addBook,
   deleteBook,
   editBook,
   getAllBooks,
   getOneBook,
} from '../../controllers/admin/book.controller';

const router = express.Router();

router.route('/').get(getAllBooks).post(addBook);
router.route('/:id').get(getOneBook).patch(editBook).delete(deleteBook);

export default router;
