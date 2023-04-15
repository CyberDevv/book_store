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

   connectDB().then(() => {
      Product.findOneAndUpdate(
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

// delete product
export const deleteProduct = (req, res) => {
   connectDB().then(() => {
      Product.findOneAndDelete({ _id: req.query.id })
         .then((productDoc) => {
            // check if product exists
            if (!productDoc) {
               return res.status(404).json({
                  message: 'Product not found',
               });
            }

            res.status(200).json({
               message: 'Product deleted successfully',
               data: productDoc,
            });
         })
         .catch((error) => {
            errorMessageFormat('Error deleting product', req);
         });
   });
};

// get one product
export const getOneProduct = (req, res) => {
   connectDB().then(() => {
      Product.findById(req.query.id, { __v: 0 })
         .then((productDoc) => {
            // check if product exists
            if (!productDoc) {
               res.status(404).json(
                  errorMessageFormat('Product not found', req)
               );
            }

            res.status(200).json({
               data: productDoc,
            });
         })
         .catch((error) => {
            errorMessageFormat('Error getting product', req, error);
         });
   });
};
