import { user } from "../models/user.model";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
const jwt = require('jsonwebtoken');



export const registerUser = async (body) => {
  const data = await user.create(body);
  return data;
};

export const loginUser = async (email, password) => {
  console.log("login with me2")
  const data = await user.findOne({ email }); //find user by email and password
  //Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, data.password);
  console.log("hello", data._id);
  if (isMatch) {
    console.log("login with me3");
    return data;
  }
  else {
    return null;
  }
}

export const generateToken = async (data) => {
  const payload = data._id;
  console.log("its generetetoken", payload);
  const secreteKey = process.env.SECRET_KEY;
  const token = jwt.sign({ _id: payload }, secreteKey, { expiresIn: '30d' });
  console.log("goojcbjhadsvc", token);
  return token;
}




export const setWishlist = async (bookid, updateLiked, userId) => {
  try {
    // Create the wishlist item object
    const wishlistItem = { bookid: bookid, Liked: updateLiked };

    // Update the user by adding the new wishlist item using $addToSet
    const updatedUser = await user.findByIdAndUpdate(
      userId, // Find the user by ID
      { $addToSet: { wishlist: wishlistItem } }, // Correct usage of $addToSet
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};


export const getWishList = async (userId) => {
  try {
    const userData = await user.findById(
      userId, // Find the user by ID
    );
    // console.log(userData.wishlist);

    if (!userData) {
      throw new Error("User not found");
    }
    return userData.wishlist;

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

export const getCart = async (userId) => {
  try {
    const userData = await user.findById(
      userId, // Find the user by ID
    );
    // console.log(userData.wishlist);

    if (!userData) {
      throw new Error("User not found");
    }
    return userData.addToCart;

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

export const updateWishList = async (userId, wishlist) => {
  try {
    // Find the user by userId
    const User = await user.findById(userId);

    // Replace the user's wishlist with the new one
    User.wishlist = wishlist;
    console.log("Hello", User.wishlist);

    return User.save();
  } catch (error) {
    console.error('Error updating wishlist:', error);
  }
}

export const addToCart = async (userId, addToCart) => {
  try {
    // Find the user by userId
    const User = await user.findById(userId);

    // Replace the user's addToCart with the new one
    User.addToCart = addToCart;
    console.log("Hello", User.addToCart);

    return User.save();

  } catch (error) {
    console.error('Error updating Cart:', error);
  }
}

export const removeFromCart = async (userId, bookid) => {
  try {
    // Find the user by their ID
    const User = await user.findById(userId);

    if (!User) {
      throw new Error('User not found');
    }

    // Remove the bookid from the addToCart array
    User.addToCart.splice(bookid);

    console.log('Book removed from cart');
    return { success: true, message: 'Book removed from cart' };
  } catch (error) {
    console.error('Error removing book from cart:', error);
  }
};
