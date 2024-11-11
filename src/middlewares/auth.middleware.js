import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { user } = await jwt.verify(bearerToken, process.env.SECRET_KEY);

    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
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
