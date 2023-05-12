import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser
} from '../controller/userController.js';
const userRoute = express.Router();

import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

userRoute.post('/create', createUser);
userRoute.get('/getAll' ,getAllUsers);
userRoute.put('/update/:userId', updateUserById); 
userRoute.delete('/delete/:userId', deleteUserById);

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);



export default userRoute;
