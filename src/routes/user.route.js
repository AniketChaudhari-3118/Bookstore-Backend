import express from 'express';
import * as userController from '../controllers/user.controller.js';
import Book from '../models/books.model.js';
import { authenticate, userAuth } from '../middlewares/auth.middleware.js'
import jwt from 'jsonwebtoken';
import { user } from '../models/user.model.js';


const userRoute = express.Router();

userRoute.post('/register', userController.registerUser);
userRoute.post('/login', userController.loginUser);
// userRoute.post('/protected', userAuth,);

userRoute.post('/protected', userAuth, (req, res) => {
    res.status(200).json({
      valid: true,
      message: "Authentication Successful",
      data: req.user._id,
    });
  });
  

userRoute.post('/book/:_id', userController.setWishlist);

userRoute.get('/getData/:_id', userController.getWishList); //get updated data for wishlist
userRoute.get('/getDataCart/:_id', userController.getCart); //get updated data for cart

// userRoute.delete('/book/delete/:_id', userController.deleteFromWishList);
userRoute.post('/book/updateWishList/:_id', userController.updateWishList); //to update wishList
userRoute.post('/book/addToCart/:_id', userController.addToCart); //to update addTOCart array
userRoute.delete('/book/removeFromCart/:_id', userController.removeFromCart) // remove the book from cart page

//to get the books by thier ids in likedPage and in cartpage
userRoute.get('/getbook/:_id', async (req, res) => {
    // Get the book id from the request parameters
    const bookid = req.params._id;

    try {
        // Find the book in the database
        const book = await Book.findOne({ _id: bookid });

        // Send the response with the book data
        res.send({ data: book });
    } catch (error) {
        // Log any errors that occur
        console.error("Error fetching book:", error);
        res.status(500).send({ error: 'Failed to fetch book data' });
    }
});




export default userRoute;