import HttpStatus from 'http-status-codes';
import * as service from '../services/user.service.js'
import bcrypt from 'bcrypt';


export const registerUser = async (req, res) => {
    try {
        const { password, ...otherData } = req.body; // extract password and other data
        const hashedPassword = await bcrypt.hash(password, 10); // hash the password
        const data = await service.registerUser({ ...otherData, password: hashedPassword });

        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'User Registered Successfully',
        });

        return data;
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const loginUser = async (req, res) => {
    try {
        console.log("login with me")
        const { email, password } = req.body; //extract email and password from the request body
        console.log(email, password);
        const data = await service.loginUser(email, password);
        if (data) {
            console.log(data);
            const generated_token = await service.generateToken(data);
            // console.log("got the token", generated_token);
            res.status(200).json({
                message: 'Login Successful',
                data: data,
                token: generated_token
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }


    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const setWishlist = async (req, res) => {
    try {
        const { id, Liked } = req.body;
        const userId = req.params._id;


        const data = await service.setWishlist(id, Liked, userId);
        if (data) {
            res.status(200).json({
                message: 'Updated Successfully',
                data: data
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const getWishList = async (req, res) => {
    try {
        const userId = req.params._id;
        const data = await service.getWishList(userId);

        if (data) {
            res.status(200).json({
                message: 'Updated Successfully',
                data: data
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.params._id;
        const data = await service.getCart(userId);

        if (data) {
            res.status(200).json({
                message: 'Updated Successfully',
                data: data
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const updateWishList = async (req, res) => {
    try {
        const { wishlist } = req.body; // New wishlist to replace the old one
        const userId = req.params._id; // User ID from URL parameters

        const data = await service.updateWishList(userId, wishlist);
        if (data) {
            return res.status(200).json({ message: 'Wishlist updated successfully', wishlist: data.wishlist });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating wishlist:', error);
    }
}

export const addToCart = async (req, res) => {
    try {
        const { addToCart } = req.body;
        console.log("cartlist ", addToCart)
        const userId = req.params._id;

        const data = await service.addToCart(userId, addToCart);
        if (data) {
            return res.status(200).json({ message: 'Cart updated successfully', addToCart: data.addToCart });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating Cart:', error);
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { userId, bookid } = req.params;
        const data = await service.removeFromCart(userId, bookid);
        if (data) {
            return res.status(200).json({ message: 'Cart updated successfully', addToCart: data.addToCart });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating Cart:', error);
    }
}

// export const deleteFromWishList = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const userId = req.params._id;

//         const data = await service.deleteFromWishList(id, userId);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// }