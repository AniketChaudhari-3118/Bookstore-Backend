import HttpStatus from 'http-status-codes';
import * as booksService from '../services/books.service'


// Get all books 
export const getBooks = async (req, res) => {
    try {
        const books = await booksService.getAllBooks(req.body);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};