import {
   addProduct,
   editProduct,
   deleteProduct,
   getOneProduct,
   getAllProducts,
} from '../controllers/admin/product.controller';
import {
   getAllProductsUser,
   addToCart,
} from '../controllers/user/product.controller';
import { loginRequired, adminRequired } from '../controllers/auth.controllers';

const routes = (app, prefix) => {
   // add product route
   app.route(`${prefix}/`)
      .post(loginRequired, adminRequired, addProduct)
      .put(loginRequired, adminRequired, editProduct)
      .delete(loginRequired, adminRequired, deleteProduct)
      .get(loginRequired, adminRequired, getOneProduct);

   // get all products route (admin)
   app.route(`${prefix}/admin/getAllproducts`).get(
      loginRequired,
      adminRequired,
      getAllProducts
   );

   // get all products route (user)
   app.route(`${prefix}/getAllproducts`).get(getAllProductsUser);

   // add product to cart route
   app.route(`${prefix}/addToCart`).post(addToCart);
};

export default routes;
