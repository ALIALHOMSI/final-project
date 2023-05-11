import express from 'express';
import {
  createProductImage,
  getProductImage,
  updateProductImage,
  deleteProductImage,
  getAllProductImages,
} from '../controller/productImagesController.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/create', upload.single('image'), createProductImage);
router.get('/get/:id', getProductImage);
router.put('/update/:id', updateProductImage);
router.delete('/delete/:id', deleteProductImage);
router.get('/getAll', getAllProductImages);

export default router;
