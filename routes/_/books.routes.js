import express from 'express';
import { getAllBooksUser } from '../../controllers/user/book.controller';

const router = express.Router();

router.route('/').get(getAllBooksUser);

export default router;
