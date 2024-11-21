import HttpStatus from 'http-status-codes';
import * as booksService from '../services/books.service'
// import Book from '../model/books.model.js';


// Get all books 
export const getBooks = async (req, res) => {
    try {
        const books = await booksService.getAllBooks(req.body);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update the Liked status
export const updateLikedStatus = async (req, res) => {
    const bookId = req.params.id;
    const { Liked } = req.body;

    try {
        const updateLiked = await booksService.updateLiked(bookId, Liked);
        if (updateLiked) {
            res.status(200).json({ message: 'Book liked status updated successfully.' });
        } else {
            res.status(404).json({ message: 'Book not found.' });
        }
    } catch (error) {
        console.error('Error updating liked status:', error);
        res.status(500).json({ message: 'Failed to update liked status.' });
    }
}