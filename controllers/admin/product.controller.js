import Product from '../../models/product.model';
import connectDB from '../../utils/dbConnect';
import { errorMessageFormat } from '../../utils/errorMessageFormat';

// Add product
export const addProduct = (req, res) => {
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

// Edit product
export const editProduct = (req, res) => {
   const { productName, description, price, image, category, quantity } =
      req.body;

   connectDB().then(async () => {
      await Product.findOneAndUpdate(
         { _id: req.query.id },
         {
            productName,
            description,
            price,
            image,
            category,
            quantity,
         },
         { new: true }
      )
         .then((productDoc) => {
            // check if product exists
            if (!productDoc) {
               return res.status(404).json({
                  message: 'Product not found',
               });
            }

            res.status(200).json({
               message: 'Product updated successfully',
               data: productDoc,
            });
         })
         .catch((error) => {
            errorMessageFormat('Error updating product', req, error);
         });
   });
};
