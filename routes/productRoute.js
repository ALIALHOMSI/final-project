import express from 'express';
import {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/create', createProduct);
router.get('/get/:id', getProductById);
router.put('/update/:id', updateProductById);
router.delete('/delete/:id', deleteProductById);
router.get('/getAll', getProducts);

export default router;
