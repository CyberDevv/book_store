import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import connectDB from '../utils/dbConnect';

// loign controtller
export const login = (req, res) => {
   const { email, password } = req.body;

   connectDB().then(() => {
      User.findOne({
         email,
      })
         .then((userDoc) => {
            if (!userDoc) {
               res.status(401).json({
                  message: 'Authentication failed. User not found.',
               });
            } else {
               // compare password
               if (!userDoc.comparePassword(password, userDoc.hashPassword)) {
                  return res.status(401).json({
                     message: 'Authentication failed. Wrong password.',
                  });
               } else {
                  return res.json({
                     token: jwt.sign(
                        {
                           email: userDoc.email,
                           name: userDoc.name,
                           _id: userDoc.id,
                        },
                        process.env.JWT_SECRET,
                        {
                           expiresIn: '1d',
                        }
                     ),
                  });
               }
            }
         })
         .catch((err) => {
            res.status(500).json({
               message: 'Something went wrong',
               error: err.message,
            });
         });
   });
};

// register controtller
export const register = async (req, res) => {
   const { name, email, password, confirmPassword } = req.body;

   // compare passwords
   if (password !== confirmPassword) {
      return res.status(400).json({
         message: 'Passwords do not match',
      });
   }

   connectDB().then(() => {
      User.findOne({ email })
         .then((user) => {
            // check if user exists
            if (user) {
               return res.status(400).json({
                  message: 'User already exists',
               });
            } else {
               // create new user
               const user = new User({
                  name,
                  email,
                  hashPassword: bcrypt.hashSync(password, 14),
               });

               // save the created user
               user
                  .save()
                  .then((user) => {
                     user.hashPassword = undefined;

                     res.status(200).json({
                        message: 'User created successfully',
                        user,
                     });
                  })
                  .catch((err) => {
                     res.status(500).json({
                        message: 'Something went wrong',
                        error: err.message,
                     });
                  });
            }
         })
         .catch((err) => {
            res.status(500).json({
               message: 'Something went wrong',
               error: err.message,
            });
         });
   });
};

// login required middleware
export const loginRequired = (req, res, next) => {
   if (req.user) {
      next();
   } else {
      return res.status(401).json({
         message: 'Unauthorized user!',
      });
   }
};
