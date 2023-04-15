import { addProduct } from '../controllers/admin/product.controller';
import { loginRequired } from '../controllers/auth.controllers';

const routes = (app, prefix) => {
   // add product route
   app.route(`${prefix}/addProduct`).post(loginRequired, addProduct);
};

export default routes;
