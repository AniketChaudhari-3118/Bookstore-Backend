
import mongoose from "mongoose";
import { Schema } from 'mongoose';



const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        wishlist: [
            {
                bookid: String,
            }
        ],
        addToCart: [
            {
                bookid: String,
            }
        ]
    },
    {
        timestamps: true
    }
);


// Prevent generation of _id for subdocuments in wishlist and addToCart
userSchema.path('wishlist').schema.set('_id', false);
userSchema.path('addToCart').schema.set('_id', false);

export const user = mongoose.model("users", userSchema)