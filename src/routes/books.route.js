import express from 'express';
import * as bookController from '../controllers/books.controller.js'


const bookRoute = express.Router();



// Get all books 
bookRoute.get('/fetch', bookController.getBooks);

// // Update for liked
// bookRoute.put('/update/:noteId', bookController.updateNote);


// // Update for AddToCart
// bookRoute.put('/update/:noteId', bookController.updateNote);


export default bookRoute;