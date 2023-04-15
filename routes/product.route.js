import {
   addProduct,
   editProduct,
   deleteProduct,
   getOneProduct,
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

   // delete product route
   app.route(`${prefix}/deleteProduct`).delete(
      loginRequired,
      adminRequired,
      deleteProduct
   );

   // delete product route
   app.route(`${prefix}/getProduct`).get(
      loginRequired,
      adminRequired,
      getOneProduct
   );
};

export default routes;
