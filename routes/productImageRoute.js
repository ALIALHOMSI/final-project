import express from 'express';
import {
  createProductImage,
  getProductImageById,
  updateProductImageById,
  deleteProductImageById,
  getAllProductImages,
} from '../controller/productImagesController.js';
import upload from '../utils/multer.js';

const productImageRoute = express.Router();

productImageRoute.post('/create', upload.single('image'), createProductImage);
productImageRoute.get('/get/:id', getProductImageById);
productImageRoute.put('/update/:id',updateProductImageById);
productImageRoute.delete('/delete/:id', deleteProductImageById);
productImageRoute.get('/getAll', getAllProductImages);

export default productImageRoute; 