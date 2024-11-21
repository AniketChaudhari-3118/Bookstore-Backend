import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { log } from 'winston';
dotenv.config();


/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extracts the token after 'Bearer'

  console.log('Token received:', token); // Debugging: Log the token

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Token verification error:', err.message); // Debugging: Log verification errors
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach the user payload to the request object
    console.log('Decoded user:', req.user); // Debugging: Log the decoded user
    next(); // Proceed to the next middleware/route handler
  });
};


export const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(400).json({
      status: 400,
      message: 'Authorization token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request

    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid authorization token'
    });
  }
};



// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer

//   if (token == null) return res.status(401).json({ message: 'No token provided' });

//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });

//     req.user = user; // Attach user data to request object
//     next(); // Proceed to the next middleware or route handler
//   });
// };
