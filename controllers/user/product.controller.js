import Product from '../../models/product.model';
import User from '../../models/user.model';
import { errorMessageFormat } from '../../utils/errorMessageFormat';

// get all products
export const getAllProductsUser = (req, res) => {
   Product.find({}, { __v: 0 })
      .then((productDoc) => {
         res.status(200).json({
            data: productDoc,
         });
      })
      .catch((error) => {
         errorMessageFormat('Error getting products', req, error);
      });
};

// add product to cart
export const addToCart = (req, res) => {
   const { productId, quantity = 1 } = req.body;

   Product.findById(productId).then((product) => {
      User.findById(req.user._id)
         .then((user) => {
            return user.addToCart(product, quantity);
         })
         .then(() => {
            res.status(200).json({
               message: 'Product added to cart',
            });
         });
   });
};
