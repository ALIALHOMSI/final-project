import express from 'express';
import {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItemById,
  deleteAllCartItems,
} from '../controller/cartController.js';

const router = express.Router();

router.post('/create', createCartItem);

router.get('/getAll', getAllCartItems);

router.get('/:cartItemId', getCartItemById);

router.put('/:cartItemId', updateCartItemById);

router.delete('/delete', deleteAllCartItems);

export default router;
