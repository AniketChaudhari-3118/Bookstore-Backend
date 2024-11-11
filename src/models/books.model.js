
import boolean from '@hapi/joi/lib/types/boolean';
const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    imageUrl: {
        type: String, required: true
    },
    title: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    actualPrice: {
        type: Number,
        required: true
    },
    Liked: {
        type: Boolean,
        required: true
    },
    AddToCart: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);