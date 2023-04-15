import {
   addProduct,
   editProduct,
} from '../controllers/admin/product.controller';
import { loginRequired, adminRequired } from '../controllers/auth.controllers';

const routes = (app, prefix) => {
   // add product route
   app.route(`${prefix}/addProduct`).post(
      loginRequired,
      adminRequired,
      addProduct
   );

   // edit product route
   app.route(`${prefix}/editProduct`).put(
      loginRequired,
      adminRequired,
      editProduct
   );
};

export default routes;
