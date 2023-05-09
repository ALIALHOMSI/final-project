import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'


export const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    res.status(401);
    throw new Error('Authorization token not found');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(403);
      throw new Error('Invalid token');
    }
     res.locals.userId=decoded.id
     res.locals.email=decoded.email

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    next();
  });
};

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user.role === 'user') {
      return next(new ErrorResponse('Access denied, you must be an admin', 401));
  }
  next();
};
