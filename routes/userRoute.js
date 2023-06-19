import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser,
  verifyOTP

} from '../controller/userController.js';

const router = express.Router();



router.post('/create', createUser);
router.get('/getAll',getAllUsers);
router.get('/get/:userId', getUserById);
router.put('/update/:userId', updateUserById);
router.delete('/delete/:userId', deleteUserById);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/verify-otp", verifyOTP);

 


export default router;
 
