import connectDB from '../utils/dbConnect';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

export const login = (req, res) => {
   const { email, password } = req.body;

   res.send('login');
};

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
