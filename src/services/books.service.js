
import Note from '../models/books.model'
import Book from '../models/books.model.js';

// Get all books
export const getAllBooks = async () => {
    try {
        return await Note.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateLiked = async (bookId, liked) => {
    try {
        // Find the book by _id and update the Liked field
        return await Book.findOneAndUpdate(
            { _id: bookId },
            { Liked: liked },
            { new: true }  // Return the updated document
        );
    } catch (error) {
        throw new Error(error.message);
    }
}