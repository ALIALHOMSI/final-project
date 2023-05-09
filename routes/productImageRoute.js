import express from 'express';
import {
  createProductImage,
  getProductImageById,
  updateProductImageById,
  deleteProductImageById,
  getProductImages,
} from '../controller/productImagesController.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/create', upload.single('image'), createProductImage);
router.get('/get/:id', getProductImageById);
router.put('/update/:id', updateProductImageById);
router.delete('/delete/:id', deleteProductImageById);
router.get('/getAll', getProductImages);

export default router;
