import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { error404 } from './controllers/error404.controller';
import authRoutes from './routes/auth.routes';

dotenv.config();
const app = express();

// cors setup
app.use(cors());

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
authRoutes(app, '/auth');
app.use(error404);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
