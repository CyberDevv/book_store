import Product from '../../models/product.model';
import connectDB from '../../utils/dbConnect';
import { errorMessageFormat } from '../../utils/errorMessageFormat';

// Add product
export const addProduct = async (req, res) => {
   const { productName, description, price, image, category, quantity } =
      req.body;

   connectDB().then(() => {
      const product = new Product({
         productName,
         description,
         price,
         image,
         category,
         quantity,
         userId: req.user._id,
      });

      product
         .save()
         .then((productDoc) => {
            res.status(201).json({
               message: 'Product added successfully',
               data: productDoc,
            });
         })
         .catch((error) => {
            errorMessageFormat('Error creating product', req, error);
         });
   });
};
