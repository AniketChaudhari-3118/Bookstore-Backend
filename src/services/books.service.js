
import Note from '../models/books.model'


// Get all books
export const getAllBooks = async () => {
    try {
        return await Note.find();
    } catch (error) {
        throw new Error(error.message);
    }
};